import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail, verifyPassword } from "./db-actions/user"
import { db } from "./db/drizzle"
import { users, verificationTokens } from "./db/schema/user"
import { eq, and, gt } from "drizzle-orm"

class BannedUserError extends CredentialsSignin {
  code = "BannedUser"
  message = "Your account is restricted. Contact support for more information."
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                try {
                    const user = await getUserByEmail(email);
                    
                    if (!user || !user.password) {
                        return null;
                    }

                    // Check if user is banned
                    if (user.banned) {
                        throw new BannedUserError()
                    }

                    const isPasswordValid = await verifyPassword(password, user.password);
                    
                    if (!isPasswordValid) {
                        return null;
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image,
                        sessionVersion: user.sessionVersion,
                    };
                } catch (error) {
                    if (error instanceof BannedUserError) {
                        throw error
                    }
                    console.error("Authentication error:", error);
                    return null;
                }
            }
        }),
        Credentials({
            id: "magic-link",
            name: "Magic Link",
            credentials: {
                email: { label: "Email", type: "email" },
                token: { label: "Token", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.token) {
                    return null;
                }

                const email = credentials.email as string;
                const token = credentials.token as string;

                try {
                    // Verify token exists and hasn't expired
                    const tokenRecord = await db.query.verificationTokens.findFirst({
                        where: and(
                            eq(verificationTokens.identifier, email),
                            eq(verificationTokens.token, token),
                            gt(verificationTokens.expires, new Date())
                        ),
                    });

                    if (!tokenRecord) {
                        return null;
                    }

                    // Get user
                    const user = await db.query.users.findFirst({
                        where: eq(users.email, email),
                    });

                    if (!user) {
                        return null;
                    }

                    // Check if user is banned
                    if (user.banned) {
                        throw new BannedUserError()
                    }

                    // Delete the used token
                    await db.delete(verificationTokens)
                        .where(eq(verificationTokens.token, token));

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image,
                        sessionVersion: user.sessionVersion,
                    };
                } catch (error) {
                    if (error instanceof BannedUserError) {
                        throw error
                    }
                    console.error("Magic link authentication error:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                token.sessionVersion = user.sessionVersion;
            }
            
            // Handle session updates
            if (trigger === "update" && session) {
                token.name = session.name;
                token.email = session.email;
                token.image = session.image;
            }
            
            // Check for force logout on every JWT refresh
            // Compare token sessionVersion with database
            if (token.id && token.sessionVersion) {
                try {
                    const dbUser = await db.query.users.findFirst({
                        where: eq(users.id, token.id as string),
                        columns: { sessionVersion: true, banned: true }
                    });
                    
                    // If user is banned or sessionVersion doesn't match, invalidate session
                    if (!dbUser || dbUser.banned || dbUser.sessionVersion !== token.sessionVersion) {
                        // Return null to invalidate the token (force logout)
                        return null;
                    }
                } catch (error) {
                    console.error("Error checking session version:", error);
                }
            }
            
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.image as string;
            }
            
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
    },
})
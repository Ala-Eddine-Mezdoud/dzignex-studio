import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Replace this with your actual database logic
                const user = { id: "1", name: "Admin", email: "ala@gmail.com", password: "alaeddine" };

                if (
                    credentials?.email === user.email &&
                    credentials?.password === user.password
                ) {
                    return user;
                }
                return null;
            }
        })
    ],
})
import { auth } from "../auth"

/**
 * Require an authenticated session.
 * Throws "Unauthorized" if no valid session exists.
 */
export async function requireAuth() {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }
    return session
}

/**
 * Require an authenticated session with ADMIN role.
 * Throws "Forbidden" if the user is not an admin.
 */
export async function requireAdmin() {
    const session = await requireAuth()
    if (session.user.role !== "ADMIN") {
        throw new Error("Forbidden: admin access required")
    }
    return session
}

import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: string
    image: string | null
    sessionVersion?: number
  }

  interface Session {
    user: {
      id: string
      name: string | null
      email: string
      role: string
      image: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: string
    image?: string | null
    sessionVersion?: number
  }
}

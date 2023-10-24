import {
  type DefaultSession,
  type Session,
} from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    id: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}
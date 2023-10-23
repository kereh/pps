import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type Session,
} from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { env } from "@/env.mjs"
import { db } from "@/server/db"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string
      role: string
    }
  }

  interface User {
    role: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/masuk"
  },
  providers: [
    Credentials({
      id: "login_pps",
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials, req) {
        const user = await db.user.findFirst({
          where: {
            username: credentials?.username,
            password: credentials?.password
          }
        })
        if (user) return user
        return null
      }
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ user, session }) {
      const sess: Session = {
        ...session,
        user: {
          ...session.user,
        }
      }
      return sess
    },
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}

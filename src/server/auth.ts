import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type NextAuthOptions,
  type Session,
} from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { env } from "@/env.mjs"
import { db } from "@/server/db"
import Credentials from "next-auth/providers/credentials"


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
      async authorize(credentials) {
        const user = await db.user.findFirst({
          where: {
            username: credentials?.username,
            password: credentials?.password
          }
        })
        if (user) {
          return user
        }
        return null
      }
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      const sess: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role,
        }
      }
      return sess
    },
  },
}


export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}

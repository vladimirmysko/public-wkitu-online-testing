import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        userId: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { id: Number(credentials.userId) },
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + "",
          name: user.username,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any

        return {
          ...token,
          id: u.id,
          role: u.role,
        }
      }

      return token
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      }
    },
  },
}

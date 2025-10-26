import type { NextAuthOptions } from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"

// NOTE: This is a skeleton NextAuth options file. To enable fully:
// 1) install `@next-auth/prisma-adapter` and `next-auth` (already in package.json)
// 2) set NEXTAUTH_URL and NEXTAUTH_SECRET in env
// 3) import this into your auth route handler

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma as any),
  providers: [
    // GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      // attach user id
      return session
    },
  },
}

export default authOptions

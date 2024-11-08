import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { findUserByEmail, createUser } from "@/lib/sanity/client"

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('Missing GitHub OAuth credentials');
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await findUserByEmail(credentials.email)

        if (!user || user.password !== credentials.password) {
          return null
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          provider: 'credentials'
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "select_account",
          response_type: "code",
        }
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      try {
        // 查找用户是否存在
        const existingUser = await findUserByEmail(user.email)
        
        if (!existingUser) {
          // 创建新用户
          await createUser({
            email: user.email,
            name: user.name || '',
            image: user.image || '',
            providerId: user.id,
            provider: account?.provider as 'google' | 'github' | 'credentials',
          })
        }
        
        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        
        // 获取 Sanity 中的用户数据
        const userData = await findUserByEmail(session.user.email!)
        if (userData) {
          session.user.provider = userData.provider
        }
      }
      return session
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: true,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

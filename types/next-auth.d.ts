import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      provider?: 'google' | 'github'
      locale?: string
    } & DefaultSession['user']
  }
} 
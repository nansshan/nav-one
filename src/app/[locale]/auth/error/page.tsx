'use client'

import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="mt-2 text-muted-foreground">{error}</p>
      </div>
    </div>
  )
} 
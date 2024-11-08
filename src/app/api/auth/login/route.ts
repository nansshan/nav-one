import { NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/sanity/client'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // 查询用户
    const user = await findUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // 验证密码
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
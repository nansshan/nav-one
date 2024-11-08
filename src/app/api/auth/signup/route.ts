import { NextResponse } from 'next/server'
import { createUser, findUserByEmail } from '@/lib/sanity/client'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // 检查邮箱是否已存在
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    // 创建用户
    const user = await createUser({
      email,
      name,
      password,
      image: '', // 可以设置默认头像
      providerId: 'credentials',
      provider: 'credentials',
    })

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
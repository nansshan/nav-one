'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { GoogleLoginButton } from "@/components/GoogleLoginButton"
import { GitHubLoginButton } from "@/components/GitHubLoginButton"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const t = useTranslations('loginModal');
  const router = useRouter();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSignUpClick = () => {
    onClose();
    router.push(`/${locale}/signup`);
  };

  const handleLoginSuccess = () => {
    onClose();
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      toast.error(t('emailRequired'))
      return false
    }

    if (!formData.password) {
      toast.error(t('passwordRequired'))
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 添加表单验证
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // 先调用自己的登录 API
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await loginResponse.json()

      if (!loginResponse.ok) {
        setIsLoading(false)
        // 根据不同的错误状态显示不同的错误信息
        if (loginResponse.status === 401) {
          toast.error(t('invalidCredentials'))
        } else {
          toast.error(t('loginError'))
        }
        return
      }

      // 如果登录 API 验证通过，再调用 NextAuth 的 signIn
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(t('loginError'))
      } else {
        toast.success(t('loginSuccess'))
        handleLoginSuccess()
        router.push(`/${locale}`)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(t('loginError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded text-primary-foreground font-semibold">
            dir
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold tracking-tight">
              {t('welcomeBack')}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('password')}</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? t('loggingIn') : t('login')}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('orContinueWith')}
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <GoogleLoginButton 
              text={t('loginWithGoogle')} 
              onSuccess={handleLoginSuccess}
            />
            <GitHubLoginButton 
              text={t('loginWithGitHub')} 
              onSuccess={handleLoginSuccess}
            />
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {t('noAccount')}{' '}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={handleSignUpClick}
            >
              {t('signUp')}
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
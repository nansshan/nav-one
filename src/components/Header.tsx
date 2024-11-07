'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"// 确保路径正确

import { useState } from 'react';
import LoginModal from './LoginModal'; // 确保路径正确

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleLanguageChange = (value: string) => {
    router.push(`/${value}`);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <nav className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-emerald-500" />
                <span className="text-lg font-semibold">Mkdirs Demo</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('search')}
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('category')}
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('tag')}
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('blog')}
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('pricing')}
                </Link>
                <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('submit')}
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleLoginClick}>
                {t('signIn')}
                <span className="ml-2">→</span>
              </Button>
              <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
} 
'use client';

import Link from "next/link"
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-gray-800 bg-black text-gray-400 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo and Social Section - 占据2列 */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-emerald-500" />
              <span className="text-lg font-semibold text-white">Mkdirs Demo</span>
            </Link>
            <p className="mt-4 text-sm">
              {t('description')}
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </Link>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-sm">
              <span>{t('builtWith')}</span>
              <div className="flex items-center space-x-1">
                <div className="h-4 w-4 rounded bg-emerald-500" />
                <span className="font-medium text-white">Mkdirs</span>
              </div>
            </div>
          </div>

          {/* Product Links - 占据1列 */}
          <div>
            <h3 className="font-semibold text-white">{t('product.title')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">{t('product.landing')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('product.search')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('product.category')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('product.tag')}</Link></li>
            </ul>
          </div>

          {/* Resources Links - 占据1列 */}
          <div>
            <h3 className="font-semibold text-white">{t('resources.title')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">{t('resources.pricing')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('resources.submit')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('resources.blog')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('resources.changelog')}</Link></li>
            </ul>
          </div>

          {/* Support Links - 占据1列 */}
          <div>
            <h3 className="font-semibold text-white">{t('support.title')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.github')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.twitter')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.youtube')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('support.email')}</Link></li>
            </ul>
          </div>

          {/* Company Links - 占据1列 */}
          <div>
            <h3 className="font-semibold text-white">{t('company.title')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">{t('company.about')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('company.privacy')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('company.terms')}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t('company.sitemap')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 
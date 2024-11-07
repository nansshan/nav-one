'use client';

import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const t = useTranslations('home');

  return (
    <div className="mt-16 rounded-lg bg-gray-900 p-8 text-center">
      <span className="text-sm font-medium text-purple-500">{t('newsletter.badge')}</span>
      <h2 className="mt-3 text-3xl font-semibold text-white">{t('newsletter.title')}</h2>
      <p className="mt-2 text-gray-400">
        {t('newsletter.description')}
      </p>
      <div className="mx-auto mt-6 flex max-w-md gap-2">
        <Input
          type="email"
          placeholder={t('newsletter.placeholder')}
          className="bg-gray-950 border-gray-800"
        />
        <Button variant="outline" className="bg-white text-black hover:bg-gray-200">
          →
        </Button>
      </div>
    </div>
  );
} 
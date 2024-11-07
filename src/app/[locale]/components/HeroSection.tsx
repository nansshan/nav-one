'use client';

import { useTranslations } from 'next-intl';
import SearchBar from './SearchBar';

export default function HeroSection() {
  const t = useTranslations('home');

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        {t('hero.title.prefix')}{" "}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 text-transparent bg-clip-text">
          {t('hero.title.highlight')}
        </span>
      </h1>
      <p className="text-gray-400 max-w-3xl mx-auto mb-12">
        {t('hero.description')}
      </p>
      
      <SearchBar />
    </div>
  );
} 
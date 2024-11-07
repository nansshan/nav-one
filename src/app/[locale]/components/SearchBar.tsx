'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SearchBar() {
  const t = useTranslations('home');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set('name', searchTerm);
    } else {
      params.delete('name');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <Input
        placeholder={t('search.placeholder')}
        className="w-full bg-gray-900 border-gray-800 pl-4 pr-10 py-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button 
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={handleSearch}
        aria-label={t('search.button')}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  _id: string;
  title: string;
  value: string;
}

interface FilterBarProps {
  categories: Category[];
}

export default function FilterBar({ categories }: FilterBarProps) {
  const t = useTranslations('home');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categorySearch, setCategorySearch] = useState('');
  const [sortOrder, setSortOrder] = useState(searchParams.get('orderBy')?.includes('asc') ? 'asc' : 'desc');

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== 'all') {
      params.set('categoryId', value);
    } else {
      params.delete('categoryId');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('orderBy', value === 'asc' ? 'publish_time asc' : 'publish_time desc');
    params.set('page', '1');
    setSortOrder(value as 'desc' | 'asc');
    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap gap-8 justify-center items-center max-w-3xl mx-auto">
        <Select
          value={searchParams.get('categoryId') || 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
            <SelectValue placeholder={t('filters.categories.placeholder')} />
          </SelectTrigger>
          <SelectContent className="fixed">
            <div className="sticky top-0 p-2 bg-popover">
              <Input
                placeholder={t('filters.categories.searchPlaceholder')}
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="h-8"
              />
            </div>
            <ScrollArea className="h-[200px] py-2">
              <SelectItem value="all">{t('filters.categories.all')}</SelectItem>
              {filteredCategories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
              {filteredCategories.length === 0 && (
                <div className="text-center py-2 text-muted-foreground">
                  {t('filters.categories.noResults')}
                </div>
              )}
            </ScrollArea>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
            <SelectValue placeholder={t('filters.sort.placeholder')} />
          </SelectTrigger>
          <SelectContent className="fixed">
            <SelectItem value="desc">{t('filters.sort.desc')}</SelectItem>
            <SelectItem value="asc">{t('filters.sort.asc')}</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          className="w-[200px] border-gray-800"
          onClick={handleReset}
        >
          {t('filters.reset')}
        </Button>
      </div>
    </div>
  );
}
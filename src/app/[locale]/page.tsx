import { Suspense } from 'react';
import { getCategories, getWebsites } from '@/lib/sanity/client';
import { useTranslations } from 'next-intl';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import WebsiteList from './components/WebsiteList';
import HeroSection from './components/HeroSection';
import PaginationSection from './components/PaginationSection';
import NewsletterSection from './components/NewsletterSection';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // 获取服务端数据
  const categories = await getCategories();
  const filters = {
    name: searchParams.name as string,
    categoryId: searchParams.categoryId as string,
    orderBy: searchParams.orderBy as string || 'publish_time desc',
    page: parseInt(searchParams.page as string || '1'),
    pageSize: 12
  };
  
  const { websites, total, totalPages, page } = await getWebsites(filters);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Suspense>
        <HeroSection />
      </Suspense>

      {/* Filters */}
      <Suspense>
        <FilterBar categories={categories} />
      </Suspense>

      {/* Website List */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<WebsiteList websites={[]} loading={true} />}>
          <WebsiteList websites={websites} />
        </Suspense>
      </div>

      {/* Pagination */}
      <Suspense>
        <PaginationSection page={page} totalPages={totalPages} />
      </Suspense>

      {/* Newsletter Section */}
      <Suspense>
        <NewsletterSection />
      </Suspense>
    </div>
  );
}
'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { 
  CustomPaginationPrevious, 
  CustomPaginationNext 
} from "@/components/ui/custom-pagination";

interface PaginationSectionProps {
  page: number;
  totalPages: number;
}

export default function PaginationSection({ page, totalPages }: PaginationSectionProps) {
  const t = useTranslations('home');
  const searchParams = useSearchParams();

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // 最多显示的页码数
    
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // 调整起始页码，确保始终显示 maxVisiblePages 个页码
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  // 生成带有当前查询参数的URL
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 pb-16">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <CustomPaginationPrevious 
              href={page > 1 ? getPageUrl(page - 1) : '#'}
              className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              aria-label={t('pagination.previousText')}
            >
              {t('pagination.previous')}
            </CustomPaginationPrevious>
          </PaginationItem>

          {page > 2 && (
            <>
              <PaginationItem>
                <PaginationLink 
                  href={getPageUrl(1)}
                  aria-label={t('pagination.goToPage', { number: 1 })}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis aria-label={t('pagination.ellipsis')} />
                </PaginationItem>
              )}
            </>
          )}

          {getPageNumbers().map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink 
                href={getPageUrl(pageNumber)}
                isActive={page === pageNumber}
                aria-label={page === pageNumber 
                  ? t('pagination.currentPage', { number: pageNumber })
                  : t('pagination.goToPage', { number: pageNumber })
                }
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page < totalPages - 1 && (
            <>
              {page < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis aria-label={t('pagination.ellipsis')} />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink 
                  href={getPageUrl(totalPages)}
                  aria-label={t('pagination.goToPage', { number: totalPages })}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <CustomPaginationNext 
              href={page < totalPages ? getPageUrl(page + 1) : '#'}
              className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              aria-label={t('pagination.nextText')}
            >
              {t('pagination.next')}
            </CustomPaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
} 
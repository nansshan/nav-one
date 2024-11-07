'use client';

import { useState, useEffect } from 'react';
import { getWebsites } from '@/lib/sanity/client';
import type { Website, WebsiteFilters } from '@/lib/sanity/client';
import { getCategories } from "@/lib/sanity/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Category {
  title: string;
  value: string;
  _id: string;
}

export default function Home() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // 添加搜索词状态
  const [filters, setFilters] = useState<WebsiteFilters>({
    page: 1,
    pageSize: 12, // 每页12条,对应4行3列
    orderBy: 'publish_time desc'
  });
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  // 添加排序状态
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const [categorySearch, setCategorySearch] = useState('');

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchCategories() {
      try {
        console.log('Fetching categories...');
        const data = await getCategories();
        console.log('Categories data:', data);
        
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
          console.log('Categories set successfully');
        } else {
          console.log('No categories returned from API');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchWebsites();
  }, [filters]);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const response = await getWebsites(filters);
      setWebsites(response.websites);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
    } catch (error) {
      console.error('Failed to fetch websites:', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 处理搜索按钮点击
  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      name: searchTerm,
      page: 1
    }));
  };

  // 处理回车键搜索
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 处理分类选择
  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      categoryId: value === 'all' ? undefined : value,
      page: 1
    }));
  };

  // 处理排序选择
  const handleSortChange = (value: string) => {
    const orderBy = value === 'asc' ? 'publish_time asc' : 'publish_time desc';
    setSortOrder(value as 'desc' | 'asc');
    setFilters(prev => ({
      ...prev,
      orderBy,
      page: 1
    }));
  };

  // 处理重置
  const handleReset = () => {
    setSearchTerm('');
    setSortOrder('desc');
    setFilters({
      page: 1,
      pageSize: 12,
      orderBy: 'publish_time desc'
    });
  };

  // 处理分类搜索
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // 最多显示的页码数
    
    let start = Math.max(1, currentPage - 1);
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
     

      {/* Announcement Banner */}
      {/* <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-2 text-center">
        <span className="text-sm">
          🎉 Introducing Mkdirs on <span className="font-bold">X</span>
        </span>
      </div> */}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          The Ultimate{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 text-transparent bg-clip-text">
            Directory Website Template
          </span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12">
          This is a demo directory website built with Mkdirs, with which you can launch
          any trending and profitable directory website in minutes without hassle.
        </p>
        
        <div className="max-w-2xl mx-auto relative">
          <Input
            placeholder="Search any products you need"
            className="w-full bg-gray-900 border-gray-800 pl-4 pr-10 py-6"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <Button 
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-8 justify-center items-center max-w-3xl mx-auto">
          <Select
            value={filters.categoryId || 'all'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent 
              className="fixed" 
              position="popper"
            >
              <div className="sticky top-0 p-2 bg-popover">
                <Input
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="h-8"
                />
              </div>
              <ScrollArea className="h-[200px] py-2">
                <SelectItem value="all">All Categories</SelectItem>
                {filteredCategories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.title}
                  </SelectItem>
                ))}
                {filteredCategories.length === 0 && (
                  <div className="text-center py-2 text-muted-foreground">
                    No categories found
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
              <SelectValue placeholder="Sort by Time (desc)" />
            </SelectTrigger>
            <SelectContent className="fixed">
              <SelectItem value="desc">Sort by Time (desc)</SelectItem>
              <SelectItem value="asc">Sort by Time (asc)</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="w-[200px] border-gray-800"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* 网站卡片列表 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // 加载状态显示骨架屏
            Array(12).fill(null).map((_, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-800" />
                <div className="p-6">
                  <div className="h-4 bg-gray-800 rounded w-1/4 mb-4" />
                  <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-800 rounded w-full mb-4" />
                  <div className="h-4 bg-gray-800 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : (
            websites.map((website) => (
              <div key={website._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
                <div className="relative">
                  <Image
                    src={website.imageUrl || "/placeholder.svg?height=200&width=400"}
                    alt={website.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  {/* 添加 Visit Website 按钮覆盖在图片上 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <Link 
                      href={website.web_link} 
                      target="_blank"
                      className="px-4 py-2 bg-white/90 text-black rounded-md hover:bg-white transition-colors"
                    >
                      Visit Website
                    </Link>
                  </div>
                  {/* 分类标签放在图片底部 */}
                  <div className="absolute bottom-2 left-2 flex gap-2">
                    {website.category && (
                      <span className="px-2 py-1 text-xs font-medium bg-black/50 text-white backdrop-blur-sm rounded">
                        {website.category.title}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  {/* 标题和描述 */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {website.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {website.description}
                    </p>
                  </div>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2">
                    {website.tags && website.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto px-4 pb-16">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              />
            </PaginationItem>

            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {getPageNumbers().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink 
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext 
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 rounded-lg bg-gray-900 p-8 text-center">
        <span className="text-sm font-medium text-purple-500">NEWSLETTER</span>
        <h2 className="mt-3 text-3xl font-semibold text-white">Join the Community</h2>
        <p className="mt-2 text-gray-400">
          Subscribe to our newsletter for the latest news and updates
        </p>
        <div className="mx-auto mt-6 flex max-w-md gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-950 border-gray-800"
          />
          <Button variant="outline" className="bg-white text-black hover:bg-gray-200">
            →
          </Button>
        </div>
      </div>

    </div>
  )
}
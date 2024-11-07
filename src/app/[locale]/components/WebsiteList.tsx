'use client';

import Image from "next/image";
import Link from "next/link";
import type { Website } from '@/lib/sanity/client';

interface WebsiteListProps {
  websites: Website[];
  loading?: boolean;
}

export default function WebsiteList({ websites, loading = false }: WebsiteListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(12).fill(null).map((_, index) => (
          <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-800" />
            <div className="p-6">
              <div className="h-4 bg-gray-800 rounded w-1/4 mb-4" />
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-800 rounded w-full mb-4" />
              <div className="h-4 bg-gray-800 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {websites.map((website) => (
        <div key={website._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
          <div className="relative">
            <Image
              src={website.imageUrl || "/placeholder.svg?height=200&width=400"}
              alt={website.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            {/* Visit Website 按钮 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50">
              <Link 
                href={website.web_link} 
                target="_blank"
                className="px-4 py-2 bg-white/90 text-black rounded-md hover:bg-white transition-colors"
              >
                Visit Website
              </Link>
            </div>
            {/* 分类标签 */}
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
      ))}
    </div>
  );
} 
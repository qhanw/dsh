'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className 
}: PaginationProps) => {
  // 生成页码数组
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // 移动端显示的最大页码数
    
    if (totalPages <= maxVisiblePages) {
      // 如果总页数不多，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 如果总页数很多，显示部分页码
      if (currentPage <= 3) {
        // 当前页在前几页
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 当前页在后几页
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav 
      className={cn(
        "flex items-center justify-center space-x-2 sm:space-x-3 py-8",
        className
      )}
      aria-label="分页导航"
    >
      {/* 上一页按钮 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-sm rounded-lg transition-all duration-200",
          "hover:bg-gray-100 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
          "border border-gray-200 hover:border-gray-300",
          currentPage === 1 
            ? "text-gray-400 bg-gray-50" 
            : "text-gray-700 hover:text-gray-900 bg-white"
        )}
        aria-label="上一页"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 页码按钮 */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span 
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-sm text-gray-500 font-medium"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-sm rounded-lg transition-all duration-200",
              "hover:shadow-sm border",
              isActive
                ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600 shadow-sm"
                : "text-gray-700 hover:text-gray-900 bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            )}
            aria-label={`第 ${pageNumber} 页`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 下一页按钮 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-sm rounded-lg transition-all duration-200",
          "hover:bg-gray-100 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
          "border border-gray-200 hover:border-gray-300",
          currentPage === totalPages 
            ? "text-gray-400 bg-gray-50" 
            : "text-gray-700 hover:text-gray-900 bg-white"
        )}
        aria-label="下一页"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}; 
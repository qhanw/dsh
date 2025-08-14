'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, X, Home, Film, Tv, Play, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchNavigationTags } from '@/lib/api';
import { TagCategory, TagChild } from '@/types/navigation';

// 导航图标映射
const NAV_ICONS: Record<string, any> = {
  '首页': Home,
  '影片': Film,
  '连续剧': Tv,
  '综艺片': Play,
  '新闻资讯': Newspaper
};

interface MobileMenuProps {
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: ['navigation'],
    queryFn: fetchNavigationTags
  });

  const categories = data?.data || [];

  // 从URL参数中获取当前选中的tagId
  const urlTagIds = searchParams.get('tagIds');
  const currentTagId = useMemo(() => {
    if (urlTagIds) {
      try {
        const tagIds = JSON.parse(urlTagIds);
        if (Array.isArray(tagIds) && tagIds.length > 0) {
          return tagIds[0];
        }
      } catch (error) {
        console.error('Failed to parse tagIds:', error);
      }
    }
    return null;
  }, [urlTagIds]);

  // 根据URL参数初始化展开状态
  useEffect(() => {
    if (currentTagId && categories.length > 0) {
      for (const category of categories) {
        const foundChild = category.children.find(child => child.tag_id === currentTagId);
        if (foundChild) {
          setExpandedCategory(category.tag_id);
          break;
        }
      }
    }
  }, [currentTagId, categories]);

  // 处理子菜单点击，使用客户端路由
  const handleSubCategoryClick = (subCategoryId: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('tagIds', JSON.stringify([subCategoryId]));
    // 清除keywords参数，因为现在是按分类筛选
    newSearchParams.delete('keywords');
    
    router.push(`/?${newSearchParams.toString()}`);
    onClose();
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-full bg-white shadow-xl overflow-y-auto z-50" role="dialog" aria-modal="true" aria-label="移动端菜单">
      {/* 头部 - 参考图片的顶部布局 */}
      <header className="sticky top-0 bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Logo和标题 */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-gray-900">乡村电影</span>
          </div>
          
          {/* 右侧关闭按钮 */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="关闭菜单"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
      </header>
      
      {/* 内容区域 - 参考图片的左侧导航布局 */}
      <main className="flex-1">
        <nav className="p-4 space-y-2" aria-label="移动端分类导航">
          {/* 首页链接 */}
          <a
            href="/"
            className={cn(
              'flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors',
              pathname === '/' && !currentTagId
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            )}
            onClick={onClose}
          >
            <Home size={18} className="mr-3" />
            首页
          </a>

          {/* 分类列表 - 参考图片的垂直布局 */}
          {categories.map((category: TagCategory) => {
            const Icon = NAV_ICONS[category.tag_name] || Film;
            return (
              <div key={category.tag_id} className="space-y-1">
                <button
                  className={cn(
                    'flex items-center justify-between w-full py-3 px-4 rounded-lg text-base font-medium transition-colors',
                    expandedCategory === category.tag_id || (currentTagId && category.children.some(child => child.tag_id === currentTagId))
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                  onClick={() => {
                    setExpandedCategory(
                      expandedCategory === category.tag_id ? null : category.tag_id
                    );
                  }}
                >
                  <div className="flex items-center">
                    <Icon size={18} className="mr-3" />
                    <span>{category.tag_name}</span>
                  </div>
                  {category.children.length > 0 && (
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        expandedCategory === category.tag_id && 'transform rotate-90'
                      )}
                    />
                  )}
                </button>

                {/* 子分类 - 参考图片的标签式布局 */}
                {expandedCategory === category.tag_id && category.children.length > 0 && (
                  <div className="ml-4 mb-3">
                    <div className="flex flex-wrap gap-2">
                      {category.children.map((subCategory: TagChild) => (
                        <button
                          key={subCategory.tag_id}
                          onClick={() => handleSubCategoryClick(subCategory.tag_id)}
                          className={cn(
                            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
                            currentTagId === subCategory.tag_id
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-300'
                          )}
                        >
                          {subCategory.tag_name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </main>
    </aside>
  );
}; 
'use client';

import { useEffect, Suspense, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { VideoCard } from './video-card';
import { Pagination } from '@/components/ui/pagination';
import { fetchVideos, fetchHomeHot } from '@/lib/api';
import { useVideoStore } from '@/store/video';
import { VideoListResponse, Video, VideoQueryParams } from '@/types/video';

// 搜索参数包装组件
const SearchParamsWrapper = ({ children }: { children: (searchParams: URLSearchParams) => React.ReactNode }) => {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
};

const VideoGridContent = ({ searchParams }: { searchParams: URLSearchParams }) => {
  const { filters } = useVideoStore();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  // 从URL参数中获取搜索条件
  const urlKeywords = searchParams.get('keywords');
  const urlTagIds = searchParams.get('tagIds');
  
  // 判断是否使用首页热门接口
  const useHomeHot = !urlKeywords && !urlTagIds && currentPage === 0;
  
  // 合并URL参数和store中的filters
  const queryParams: VideoQueryParams = useMemo(() => {
    let parsedTagIds = filters.tagIds;
    if (urlTagIds) {
      try {
        parsedTagIds = JSON.parse(urlTagIds);
      } catch (error) {
        console.error('Failed to parse tagIds:', error);
        parsedTagIds = [];
      }
    }

    return {
      ...filters,
      keywords: urlKeywords || filters.keywords,
      tagIds: parsedTagIds,
      pageNum: currentPage,
      pageSize: 24,
    };
  }, [filters, urlKeywords, urlTagIds, currentPage]);

  // 使用不同的查询键和函数
  const { 
    data, 
    isLoading, 
    error,
    isError,
    refetch
  } = useQuery({
    queryKey: useHomeHot ? ['homeHot'] : ['videos', queryParams],
    queryFn: () => {
      if (useHomeHot) {
        console.log('Fetching home hot videos');
        return fetchHomeHot();
      } else {
        console.log('Fetching videos with params:', queryParams);
        return fetchVideos(queryParams);
      }
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5分钟
    gcTime: 10 * 60 * 1000, // 10分钟
  });

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); // API使用0-based索引，但UI使用1-based
  };

  // 当搜索条件变化时，重置到第一页
  useEffect(() => {
    setCurrentPage(0);
  }, [urlKeywords, urlTagIds]);

  // 计算总页数
  const totalPages = useMemo(() => {
    if (!data?.data?.total) return 0;
    return Math.ceil(data.data.total / (queryParams.pageSize || 24));
  }, [data?.data?.total, queryParams.pageSize]);

  // 获取当前页的视频列表
  const videos = useMemo(() => {
    const videoList = data?.data?.list || [];
    
    // 由于API层面已经进行去重，这里只需要简单的安全检查
    const uniqueVideosMap = new Map<string, Video>();
    
    videoList.forEach((video: Video) => {
      if (!uniqueVideosMap.has(video.id)) {
        uniqueVideosMap.set(video.id, video);
      } else {
        console.warn('仍然发现重复的视频:', video.id, video.name);
      }
    });
    
    const result = Array.from(uniqueVideosMap.values());
    
    // 如果还有重复，记录调试信息
    if (result.length !== videoList.length) {
      console.log(`组件层去重: ${videoList.length} -> ${result.length}`);
    }
    
    return result;
  }, [data?.data?.list]);

  // 调试信息
  console.log('VideoGrid state:', {
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,
    videosCount: videos.length,
    useHomeHot,
    queryParams,
    urlKeywords,
    urlTagIds
  });

  if (isLoading && !data) {
    return <VideoGridSkeleton />;
  }

  if (isError) {
    return (
      <section className="px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-400 text-6xl mb-4" aria-hidden="true">❌</div>
          <h2 className="text-red-500 text-lg mb-2">加载失败</h2>
          <p className="text-gray-400 text-sm mb-4">
            {error?.message || '网络错误，请稍后重试'}
          </p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            aria-label="重新加载"
          >
            重新加载
          </button>
        </div>
      </section>
    );
  }

  // 如果没有数据且不是加载状态，显示空状态
  if (!isLoading && videos.length === 0) {
    return (
      <section className="px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-6xl mb-4" aria-hidden="true">📺</div>
          <h2 className="text-gray-500 text-lg mb-2">暂无相关视频</h2>
          <p className="text-gray-400 text-sm">试试其他分类或搜索关键词</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-0">
      {/* 视频网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-8">
        {videos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
          />
        ))}
      </div>
      
      {/* 分页组件 */}
      {totalPages > 1 && (
        <div className="flex justify-center py-8 border-t border-gray-100">
          <Pagination
            currentPage={currentPage + 1} // 转换为1-based显示
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" aria-label="加载中" />
        </div>
      )}
    </section>
  );
};

// 在文件开头添加 props 接口
interface VideoGridProps {
  tagIds?: number[];
  keywords?: string;
}

// 修改组件定义
export const VideoGrid = ({ tagIds, keywords }: VideoGridProps = {}) => {
  return (
    <Suspense fallback={<VideoGridSkeleton />}>
      <SearchParamsWrapper>
        {(searchParams) => {
          // 合并传入的 props 和 URL 参数
          const mergedSearchParams = new URLSearchParams(searchParams);
          if (tagIds) {
            mergedSearchParams.set('tagIds', JSON.stringify(tagIds));
          }
          if (keywords) {
            mergedSearchParams.set('keywords', keywords);
          }
          
          return <VideoGridContent searchParams={mergedSearchParams} />;
        }}
      </SearchParamsWrapper>
    </Suspense>
  );
};

const VideoGridSkeleton = () => (
  <section className="px-4 lg:px-0" aria-label="加载中">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <article key={i} className="animate-pulse">
          <div className="aspect-[2/3] bg-gray-200 rounded-lg" />
          <div className="mt-2 space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </article>
      ))}
    </div>
  </section>
); 
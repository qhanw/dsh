import { TagResponse } from '@/types/navigation';
import { VideoDetailResponse, VideoListResponse, VideoQueryParams } from '@/types/video';
import { API_CONFIG } from '../cfg';
import { request } from './request';

// 获取导航数据
export const fetchNavigationTags = async (): Promise<TagResponse> => {
  return request<TagResponse>(API_CONFIG.ENDPOINTS.TAG);
};

// 获取视频列表
export const fetchVideos = async (params: VideoQueryParams): Promise<VideoListResponse> => {
  const queryParams: Record<string, string | number> = {
    pageNum: params.pageNum ?? 0,
    pageSize: params.pageSize ?? 24,
  };

  // 只有当tagIds存在且不为空数组时才添加到请求参数
  if (params.tagIds?.length) {
    queryParams.tagIds = JSON.stringify(params.tagIds);
  }

  // 只有当keywords存在且不为空字符串时才添加到请求参数
  if (params.keywords?.trim()) {
    queryParams.keywords = params.keywords.trim();
  }

  const response = await request<VideoListResponse>(API_CONFIG.ENDPOINTS.VIDEO, {
    params: queryParams
  });

  // 在API层面进行去重处理
  if (response.data?.list) {
    const uniqueVideosMap = new Map();
    const originalCount = response.data.list.length;
    
    response.data.list.forEach((video: any) => {
      if (!uniqueVideosMap.has(video.id)) {
        uniqueVideosMap.set(video.id, video);
      }
    });
    
    response.data.list = Array.from(uniqueVideosMap.values());
    
    // 更新总数，减去重复项
    if (response.data.list.length !== originalCount) {
      console.warn(`API去重: ${originalCount} -> ${response.data.list.length} (移除了 ${originalCount - response.data.list.length} 个重复项)`);
      // 调整总数，但保持分页逻辑正确
      response.data.total = Math.max(response.data.total - (originalCount - response.data.list.length), response.data.list.length);
    }
  }

  return response;
};

// 获取视频详情
export const fetchVideoDetail = async (id: string): Promise<VideoDetailResponse> => {
  return request<VideoDetailResponse>(API_CONFIG.ENDPOINTS.VIDEO_DETAIL(id));
};

// 获取首页热门数据
export const fetchHomeHot = async (): Promise<VideoListResponse> => {
  return request<VideoListResponse>(API_CONFIG.ENDPOINTS.HOME_HOT);
};

// 获取同类型推荐视频
export const fetchSimilarVideos = async (currentVideo: any): Promise<VideoListResponse> => {
  // 根据当前视频的特征构建查询条件
  const queryParams: Record<string, string | number> = {
    pageNum: 0,
    pageSize: 10,
  };

  // 优先使用地区作为分类依据
  if (currentVideo.region) {
    queryParams.keywords = currentVideo.region;
  }
  
  // 如果没有地区信息，使用年份
  if (!currentVideo.region && currentVideo.period) {
    queryParams.keywords = currentVideo.period;
  }

  const response = await request<VideoListResponse>(API_CONFIG.ENDPOINTS.VIDEO, {
    params: queryParams
  });

  // 过滤掉当前视频本身
  if (response.data?.list) {
    response.data.list = response.data.list.filter(video => video.id !== currentVideo.id);
  }

  return response;
}; 
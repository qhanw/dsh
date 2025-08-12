// 视频详情类型
export interface Video {
  id: string;
  name: string;
  enname: string;
  language: string;
  period: string;
  directors: string;
  actors: string;
  region: string;
  image: string;
  status_str: string;
  introduction?: string;
  playLinks?: PlayLink[];
}

// 播放链接类型
export interface PlayLink {
  title: string;
  addr: string;
}

// 视频列表响应类型
export interface VideoListResponse {
  code: number;
  msg: string;
  data: {
    list: Video[];
    pageSize: number | null;
    pageNum: number;
    total: number;
  };
}

// 视频详情响应类型
export interface VideoDetailResponse {
  code: number;
  msg: string;
  data: Video;
}

// 视频查询参数类型
export interface VideoQueryParams {
  tagIds?: number[];
  keywords?: string;
  pageNum?: number;
  pageSize?: number;
} 
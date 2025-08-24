// 视频详情类型
import { video } from "@/db";

type SelectVideo = typeof video.$inferSelect;

export type Video = Pick<
  SelectVideo,
  | "id"
  | "name"
  | "enname"
  | "language"
  | "period"
  | "directors"
  | "actors"
  | "region"
  | "image"
  | "statusStr"
  | "introduction"
> & { playLinks: PlayLink[]; ["propName"]?: any };

// 播放链接类型
export type PlayLink = {
  title: string;
  originLink: string;
};

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

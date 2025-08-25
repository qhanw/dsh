import { Metadata } from "next";

import { SITE_CONFIG } from "@/cfg";
import type { Video } from "@/types/video";

// 动态title生成器 - 参考图片中的格式
export const generateDynamicTitle = (
  video: any,
  type: "detail" | "play" | "list" = "detail"
): string => {
  const { name, period, region, language, status_str, playLinks } = video;

  // 基础信息
  const videoName = name || "未知影片";
  const year = period || "";
  const country = region || "";
  const lang = language || "";
  const status = status_str || "";
  const episodeCount = playLinks?.length || 0;

  // 画质信息
  const quality = "HD中字";
  const route = "线路F";
  const features = "高清免VIP无广告";

  // 根据不同类型生成不同的title
  switch (type) {
    case "detail":
      // 详情页格式：《电影名称》HD中字_线路F高清免VIP无广告_乡村电影网
      return `《${videoName}》${quality}_${route}${features}_${SITE_CONFIG.name}`;

    case "play":
      // 播放页格式：《电影名称》第X集_线路F免费播放全集_乡村电影网
      const episodeText = episodeCount > 1 ? `第1集` : "";
      return `《${videoName}》${episodeText}_${route}免费播放全集_${SITE_CONFIG.name}`;

    case "list":
      // 列表页格式：《电影名称》HD中字_线路F在线观看免费_乡村电影网
      return `《${videoName}》${quality}_${route}在线观看免费_${SITE_CONFIG.name}`;

    default:
      return `《${videoName}》${quality}_${route}${features}_${SITE_CONFIG.name}`;
  }
};

// 生成SEO优化的title
export const generateSEOTitle = (
  video: any,
  type: "detail" | "play" | "list" = "detail"
): string => {
  const dynamicTitle = generateDynamicTitle(video, type);

  // 添加年份和地区信息
  const { period, region } = video;
  const year = period ? `${period}年` : "";
  const country = region || "";

  let seoTitle = dynamicTitle;

  if (year || country) {
    seoTitle += `_${year}${country}`;
  }

  return seoTitle;
};

// 生成完整的动态title（包含网站名称）

export const generateFullTitle = (
  video: Video,
  type: "detail" | "play" | "list" = "detail"
): string => {
  const seoTitle = generateSEOTitle(video, type);
  return `${seoTitle} - ${SITE_CONFIG.name}`;
};

// 首页TDK
export const getHomeTDK = (): Metadata => {
  const title = SITE_CONFIG.name;
  const description = SITE_CONFIG.description;
  const keywords = SITE_CONFIG.keywords;

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: "website", locale: "zh_CN" },
    twitter: { title, description, card: "summary_large_image" },
  };
};

// 分类列表页TDK
export const getCategoryTDK = (category: string[]): Metadata => {
  category.reverse();

  const title = [...category, SITE_CONFIG.name].join(" - ");
  const description = `${category[0]}相关影视资源，${SITE_CONFIG.description}`;
  const keywords = [...category, SITE_CONFIG.keywords].join(",");

  return {
    title,
    description,
    keywords: keywords,
    openGraph: { title, description, type: "website", locale: "zh_CN" },
    twitter: { title, description, card: "summary_large_image" },
  };
};

// 搜索页TDK
export const getSearchTDK = (keyword: string): Metadata => {
  const title = `搜索: ${keyword} - ${SITE_CONFIG.name}`;
  const description = `搜索"${keyword}"相关影视资源，${SITE_CONFIG.description}`;
  const keywords = `${keyword},搜索,${SITE_CONFIG.keywords}`;

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: "website", locale: "zh_CN" },
    twitter: { title, description, card: "summary_large_image" },
  };
};

/** 视频详情页TDK - 使用动态title */
export const getVideoDetailTDK = (video: Video): Metadata => {
  const title = generateFullTitle(video, "detail");
  const description = `${video.name}高清在线观看，${SITE_CONFIG.description}`;
  const keywords = `${video.name},高清,在线观看,${SITE_CONFIG.keywords}`;

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: "video.movie", locale: "zh_CN" },
    twitter: { title, description, card: "summary_large_image" },
  };
};

// 播放页TDK - 使用动态title
export const getPlayPageTDK = (video: Video, episode?: string): Metadata => {
  const title = generateFullTitle(video, "play");
  const description = `${video.name}在线播放，高清流畅，${SITE_CONFIG.description}`;
  const keywords = `${video.name},在线播放,${SITE_CONFIG.keywords}`;

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: "video.episode", locale: "zh_CN" },
    twitter: { title, description, card: "summary_large_image" },
  };
};

// 404页面TDK
export const get404TDK = (): Metadata => ({
  title: `页面未找到 - ${SITE_CONFIG.name}`,
  description: "抱歉，您访问的页面不存在。请返回首页继续浏览精彩影视内容。",
  keywords: "404,页面未找到,影视网站",
  robots: "noindex, nofollow",
});

// 生成面包屑数据
export const generateBreadcrumbs = (
  path: string,
  categoryName?: string,
  videoName?: string
) => {
  const breadcrumbs = [{ name: "首页", url: "/" }];

  if (path.startsWith("/category/")) {
    breadcrumbs.push({ name: categoryName || "分类", url: path });
  } else if (path.startsWith("/vid/")) {
    breadcrumbs.push({ name: "视频详情", url: "#" });
    if (videoName) {
      breadcrumbs.push({ name: videoName, url: "#" });
    }
  } else if (path.startsWith("/play/")) {
    breadcrumbs.push({ name: "在线播放", url: "#" });
    if (videoName) {
      breadcrumbs.push({ name: videoName, url: "#" });
    }
  }

  return breadcrumbs;
};

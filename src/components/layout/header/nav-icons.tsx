import { Home, Film, Tv, Play, Newspaper } from "lucide-react";

type IconType = typeof Newspaper;

/** 图标配置
 * - 0: 首页
 * - 1: 影片
 * - 2: 连续剧
 * - 3: 综艺片
 * - 34: 新闻资讯
 */
const NAV_ICONS: Record<string, IconType> = {
  "0": Home,
  "1": Film,
  "2": Tv,
  "3": Play,
  "34": Newspaper,
};

export const navIcon = (key: string, back?: IconType) =>
  NAV_ICONS[key] || back || Film;

// export const NAV_ICONS = new Map<number, typeof Newspaper>([
//   [0, Home],
//   [1, Film],
//   [2, Tv],
//   [3, Play],
//   [34, Newspaper],
// ]);

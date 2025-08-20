import { db, video } from "@/db";

import { desc, sql, or, like } from "drizzle-orm";

import { paginate } from "./utils";

/**
 * 通过 tagId 分页查询视频（对视频表分页）
 * @param pinyin 分类别名
 * @param page 当前页码（从 1 开始）
 * @param pageSize 每页数量
 */
export async function queryByKeywords(
  page: number,
  pageSize: number,
  keywords?: string
) {
  const keyword = `%${keywords || ""}%`;

  return await paginate(db.query.video, {
    page,
    pageSize,
    where: or(
      like(video.name, keyword),
      like(video.enname, keyword),
      like(video.aliases, keyword),
      like(video.introduction, keyword),
      like(video.directors, keyword),
      like(video.actors, keyword)
    ),
    orderBy: () => [desc(video.createTime)],
  });
}

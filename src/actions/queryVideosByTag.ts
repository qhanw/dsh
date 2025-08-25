import { db, tag, video, tagVideo } from "@/db";

import { desc, eq, sql } from "drizzle-orm";

import { queryFlatCategories } from "./queryCategories";

async function getRealCategoryName(category: string) {
  const list = await queryFlatCategories();

  return list.find((c) => c.key === category)?.pinyin || category;
}

/**
 * 通过 tagId 分页查询视频（对视频表分页）
 * @param category 分类别
 * @param page 当前页码（从 1 开始）
 * @param pageSize 每页数量
 */
export async function queryVideosByTag(
  category: string,
  page: number,
  pageSize: number
) {
  const offset = (page - 1) * pageSize;

  const realCategory = await getRealCategoryName(category);

  // 查询视频列表
  const list = await db
    .select({
      id: video.id,
      name: video.name,
      image: video.image,
      actors: video.actors,
      period: video.period,
      region: video.region,
      statusStr: video.statusStr,
      tagId: tag.id,
      tagName: tag.name,
      tagPinyin: tag.pinyin,
    })
    .from(tagVideo)
    .innerJoin(video, eq(tagVideo.videoId, video.id))
    .innerJoin(tag, eq(tagVideo.tagId, tag.id))
    .where(eq(tag.pinyin, realCategory))
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(video.createTime));

  // 查询总数
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(tagVideo)
    .innerJoin(video, eq(tagVideo.videoId, video.id))
    .innerJoin(tag, eq(tagVideo.tagId, tag.id))
    .where(eq(tag.pinyin, realCategory));

  const total = Number(totalResult[0]?.count ?? 0);

  return {
    list,
    total,
    page,
    pageSize,
  };
}

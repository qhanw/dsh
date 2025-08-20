import { db, tag, video, tagVideo } from "@/db";

import { desc, eq, sql } from "drizzle-orm";

/**
 * 通过 tagId 分页查询视频（对视频表分页）
 * @param pinyin 分类别名
 * @param page 当前页码（从 1 开始）
 * @param pageSize 每页数量
 */
export async function queryVideosByTag(
  pinyin: string,
  page: number,
  pageSize: number
) {
  const offset = (page - 1) * pageSize;

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
    .where(eq(tag.pinyin, pinyin))
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(video.createTime));

  // 查询总数
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(tagVideo)
    .innerJoin(video, eq(tagVideo.videoId, video.id))
    .innerJoin(tag, eq(tagVideo.tagId, tag.id))
    .where(eq(tag.pinyin, pinyin));

  const total = Number(totalResult[0]?.count ?? 0);

  return {
    list,
    total,
    page,
    pageSize,
  };
}

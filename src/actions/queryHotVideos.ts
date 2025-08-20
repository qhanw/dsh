import { db, video } from "@/db";

import { desc, gt } from "drizzle-orm";

import { paginate } from "./utils";

/** 查询热门视频
 * 根据浏览记录是否大于0 且对浏览记录与年份进行降序排序
 */
export async function queryHotVideos(page: number, pageSize: number) {
  return await paginate(db.query.video, {
    page,
    pageSize,
    where: gt(video.browse, 0),
    orderBy: () => [desc(video.browse), desc(video.period)],
  });
}

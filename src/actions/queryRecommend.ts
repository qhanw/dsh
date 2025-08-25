import { db, video } from "@/db";

import { desc, gt } from "drizzle-orm";

/** 查询推荐视频
 * 根据浏览记录是否大于0 且对浏览记录与年份进行降序排序
 */
export async function queryRecommend() {
  return await db.query.video.findMany({
   // where: gt(video.browse, 0),
    orderBy: () => [desc(video.browse), desc(video.period)],
    limit: 12,
  });
}

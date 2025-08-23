import { db, video } from "@/db";

import { and, or, like, ne, eq, not } from "drizzle-orm";

import type { Video } from "@/types/video";

export async function querySimilarVideos(v: Video) {
  const keyword = `%${v.name || ""}%`;

  // 优先使用 region，否则使用 period
  const similarCondition = v.region
    ? eq(video.region, v.region)
    : eq(video.period, v.period);

  const excludeKeyword = or(
    not(like(video.name, keyword)),
    not(like(video.enname, keyword)),
    not(like(video.aliases, keyword)),
    not(like(video.introduction, keyword)),
    not(like(video.directors, keyword)),
    not(like(video.actors, keyword))
  );

  const res = await db.query.video.findMany({
    where: and(
      similarCondition, // 相似条件
      excludeKeyword, // 排除模糊匹配
      ne(video.id, v.id) // 排除自身
    ),
    limit: 8,
  });

  return res?.length
    ? res.map((c) => ({
        ...c,
        playLinks: c.playLinks ? JSON.parse(c.playLinks) : undefined,
      }))
    : [];
}

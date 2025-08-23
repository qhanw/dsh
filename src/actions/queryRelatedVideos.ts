import { db, video } from "@/db";
import { Video } from "@/types/video";

import { and, or, like, ne } from "drizzle-orm";

export async function queryRelatedVideos(v: Video) {
  const keyword = `%${v.name || ""}%`;

  const res = await db.query.video.findMany({
    where: and(
      or(
        like(video.name, keyword),
        like(video.enname, keyword),
        like(video.aliases, keyword),
        like(video.introduction, keyword),
        like(video.directors, keyword),
        like(video.actors, keyword)
      ),
      ne(video.id, v.id)
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

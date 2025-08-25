import { db, video } from "@/db";

import { sql, eq } from "drizzle-orm";

export async function queryVideoDetails(id: string) {
  const res = (
    await db
      .update(video)
      .set({ browse: sql`${video.browse || 0} +1` })
      .where(eq(video.id, id))
      .returning({
        id: video.id,
        name: video.name,
        enname: video.enname,
        language: video.language,
        period: video.period,
        directors: video.directors,
        actors: video.actors,
        region: video.region,
        image: video.image,
        statusStr: video.statusStr,
        introduction: video.introduction,
        playLinks: video.playLinks,
      })
  )?.[0];

  return res
    ? {
        ...res,
        playLinks: res.playLinks ? JSON.parse(res.playLinks) : undefined,
      }
    : undefined;
}

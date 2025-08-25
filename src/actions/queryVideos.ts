import { db, video } from "@/db";

import { desc } from "drizzle-orm";

export async function queryVideos() {
  return await db.query.video.findMany({
    orderBy: () => [desc(video.period)],
    limit: 200,
  });
}

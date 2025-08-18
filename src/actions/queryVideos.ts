import { db } from "@/db";

import { desc, eq } from "drizzle-orm";

import { paginate } from "./utils";

export async function queryVideos(page: number, pageSize: number) {
  return await paginate(db.query.video, {
    page,
    pageSize,
    // where: eq(video.title, "Hello"), // 可选
    // orderBy: desc(video.createdAt), // 可选
  });
}

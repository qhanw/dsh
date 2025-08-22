import { db } from "@/db";

export async function queryVideoDetails(id: string) {
  const res = await db.query.video.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    columns: {
      id: true,
      name: true,
      enname: true,
      language: true,
      period: true,
      directors: true,
      actors: true,
      region: true,
      image: true,
      statusStr: true,
      introduction: true,
      playLinks: true,
    },
  });

  return res
    ? {
        ...res,
        playLinks: res.playLinks ? JSON.parse(res.playLinks) : undefined,
      }
    : undefined;
}

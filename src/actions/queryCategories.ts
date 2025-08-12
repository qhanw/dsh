import { db } from "@/db";

export async function queryCategories() {
  const tags = db.query.tag.findMany();

  return tags;
}

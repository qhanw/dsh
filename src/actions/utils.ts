import { db } from "@/db";
import { SQL, count } from "drizzle-orm";

/**
 * 通用分页查询
 * @param table db.query 对象，例如 db.query.posts
 * @param options 分页与查询条件
 */
export async function paginate<T>(
  table: {
    findMany: (args?: {
      limit?: number;
      offset?: number;
      where?: SQL | undefined;
      orderBy?: any;
    }) => Promise<T[]>;
  },
  {
    page = 1,
    pageSize = 10,
    where,
    orderBy,
  }: {
    page?: number;
    pageSize?: number;
    where?: SQL;
    orderBy?: any;
  }
) {
  const offset = (page - 1) * pageSize;

  // 查数据
  const list = await table.findMany({
    where,
    orderBy,
    limit: pageSize,
    offset,
  });

  // 查总数
  // 这里必须用 db.select，因为 db.query.* 不支持 count
  const [{ count: total }] = await db
    .select({ count: count(), orderBy })
    .from((table as any).table)
    .where(where);

  return { list, total, page, pageSize };
}

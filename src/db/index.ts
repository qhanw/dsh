import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as relations from "./relations";
export * from "./schema";
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    // ssl: false // 暂时不开启 否则数据库连接不上
  },
  schema: { ...schema, ...relations },
});

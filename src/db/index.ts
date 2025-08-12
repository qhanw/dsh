import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    // ssl: false // 暂时不开启 否则数据库连接不上
  },
  //  schema: { ...schema, ...relations },
});

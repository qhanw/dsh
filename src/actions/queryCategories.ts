import { db, tag } from "@/db";

type TagItem = Pick<typeof tag.$inferSelect, "id" | "name" | "pid" | "pinyin">;

function arrayToTree(items: TagItem[]) {
  const result = []; // 存放结果集
  const itemMap: any = {};
  for (const item of items) {
    const { id: bigintId, pid, ...rest } = item;

    const id = bigintId.toString();

    const treeItem = (itemMap[id] = { ...rest, id });

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]?.children) {
        itemMap[pid].children = [];
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

export async function queryCategories() {
  const tags = await db.query.tag.findMany({
    where: (table, { eq }) => eq(table.status, true),
    columns: { id: true, name: true, pinyin: true, pid: true },
  });

  return arrayToTree(tags);
}

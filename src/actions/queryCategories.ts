import { db } from "@/db";
import { dir } from "@/cfg/dir-map";

type TagItem = {
  id: number;
  pid: number;
  name: string;
  key: string;
  pinyin: string;
};

function arrayToTree(items: TagItem[]) {
  const result = []; // 存放结果集
  const itemMap: any = {};
  for (const item of items) {
    const { id, pid, pinyin, ...rest } = item;

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

/** 匹配映射目录 */
function matchDir(dir: string[], target: string) {
  // 优先全匹配
  const c1 = dir.find((c) => c === target);
  if (c1) return c1;

  // 匹配包含目录的
  const c2 = dir.find((c) => c.includes(target));
  if (c2) return c2;

  // 目录包含的
  const c3 = dir.find((c) => target.includes(c));
  if (c3) return c3;
}

export async function queryFlatCategories() {
  const tags = await db.query.tag.findMany({
    where: (table, { eq }) => eq(table.status, true),
    columns: { id: true, name: true, pinyin: true, pid: true },
  });

  // 建立目录映射
  const dirSet = new Set([...dir]);

  const next = tags.map((c) => {
    const curr = c.pinyin;
    const arr = [...dirSet];

    const mark = matchDir(arr, curr);
    if (mark) dirSet.delete(mark);

    return { ...c, id: Number(c.id), key: mark };
  });

  const final = next.map((c) => {
    if (!c.key) {
      const val = [...dirSet][0];

      if (val) {
        dirSet.delete(val);
        return { ...c, key: val };
      }
    }
    // 当没有可映射的目录时，使用自已
    return { ...c, key: c.key || c.pinyin };
  });

  return final;
}

export async function queryCategories() {
  return arrayToTree(await queryFlatCategories());
}

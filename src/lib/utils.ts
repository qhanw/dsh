import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 查找所用父层 */
export function findParents(
  data: any[],
  aim: string,
  path: any[] = []
): any[] | undefined {
  for (const node of data) {
    // 找到返回父级路径
    if (node.id === aim) return path;

    if (node.children) {
      const res = findParents(node.children, aim, [...path, node]);
      if (res) return res;
    }
  }
  return undefined;
}

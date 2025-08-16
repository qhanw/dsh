"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";

import type { Category } from "./typing";

/** 查找所用父层 */
function findParents(
  data: Category[],
  aim: string,
  path: Category[] = []
): Category[] | undefined {
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

export function useSlug(categories: Category[]) {
  const params = useParams<{ category: string }>();

  return useMemo(() => {
    const s = params.category;
    return { slug: s, pSlug: findParents(categories, s)?.at(-1)?.id || "0" };
  }, [params, categories]);
}

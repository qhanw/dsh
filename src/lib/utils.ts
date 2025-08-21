import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------------------

type TreeNode = {
  key: string | number;
  id: string | number;
  name: string;
  children?: TreeNode[];
};

/** 查找所用父层 */
// export function findParents(
//   data: TreeNode[],
//   aim: string,
//   path: TreeNode[] = []
// ): TreeNode[] | undefined {
//   for (const node of data) {
//     // 找到返回父级路径
//     if (node.id === aim) return path;

//     if (node.children) {
//       const res = findParents(node.children, aim, [...path, node]);
//       if (res) return res;
//     }
//   }
//   return undefined;
// }

/**
 * 查找指定节点的所有父级路径（包含自己）
 * @param tree 树结构数组
 * @param target 目标节点 key
 * @returns 节点路径数组（从根到自己）
 */
export function findPath(
  tree: TreeNode[],
  target: string | number
): TreeNode[] | null {
  for (const node of tree) {
    // 找到自己
    if (node.key === target) return [node];

    // 递归查找子节点
    if (node.children) {
      const path = findPath(node.children, target);
      if (path) return [node, ...path];
    }
  }
  return null;
}

//

export function convertImgUrl(url: string) {
  const isDev = process.env.NODE_ENV === "development";

  console.log("isDev", isDev);

  if (isDev) {
    return url.replace(
      "http://127.0.0.1:8081",
      `${process.env.STATIC_IMAGE_PROTOCOL}://${process.env.STATIC_IMAGE_HOSTNAME}/images`
    );
  }

  return url;
}

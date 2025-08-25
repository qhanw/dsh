"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSlug } from "../header/useSlug";

import type { Category } from "../header/typing";

type NavSideProps = { categories: Category[] };

export function NavSide({ categories }: NavSideProps) {
  const { slug, pSlug } = useSlug(categories);

  return (
    <ul className="space-y-2">
      <li>
        <Link
          href="/"
          title="首页"
          className={cn(
            "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
            slug === "/"
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          首页
        </Link>
      </li>

      {categories.slice(0, 6).map((c) => {
        return (
          <li key={c.id} className="space-y-1">
            <Link
              href={`/${c.key}`}
              title={c.name}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm transition-all",
                [slug, pSlug].includes(c.key)
                  ? "bg-primary text-white [&>span]:text-white"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {c.name}
              {c?.children?.length && (
                <span className="ml-1 text-xs text-gray-500">
                  ({c.children.length})
                </span>
              )}
            </Link>

            {/* 子分类 - 当包含当前选中项时自动展开，或者临时显示所有子分类用于调试 */}
            {c.children?.length && (
              <div className="ml-4 mb-2">
                <ul className="flex flex-wrap gap-1">
                  {c.children.map((it) => (
                    <li key={it.id}>
                      <Link
                        href={`/${it.key}`}
                        title={it.name}
                        className={cn(
                          "px-2 py-1 rounded text-xs transition-all whitespace-nowrap",
                          slug === it.key
                            ? "bg-primary text-white font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { useMemo } from "react";
import { Category } from "../header/typing";
import { useParseUrl } from "./useParseUrl";

type BreadcrumbProps = { categories: Category[] };
export function Breadcrumb({ categories }: BreadcrumbProps) {
  const info = useParseUrl(categories);

  const breadcrumbs = useMemo(() => {
    if (info.keywords) return ["首页", "搜索结果"];

    if (info.breadcrumb) {
      return ["首页", ...(info.breadcrumb || [])?.map((c) => c.name)];
    }
    return ["首页", "热门"];
  }, [info]);

  return (
    <header className="mb-6">
      <nav className="text-sm text-gray-600" aria-label="面包屑导航">
        <ol className="flex items-center">
          {breadcrumbs.map((c, idx) => (
            <li key={idx}>
              {idx > 0 && <span className="mx-2">/</span>}
              {c}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

"use client";

import { useMemo } from "react";
import { Category } from "../header/typing";
import { useParseUrl } from "./useParseUrl";

type TitleProps = { categories: Category[] };
export function Title({ categories }: TitleProps) {
  const info = useParseUrl(categories);

  const title = useMemo(() => {
    if (info.keywords) {
      return `搜索: ${info.keywords}`;
    }

    if (info.breadcrumb) {
      return info.breadcrumb.at(-1)?.name;
    }
    return "热门";
  }, [info]);

  return <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>;
}

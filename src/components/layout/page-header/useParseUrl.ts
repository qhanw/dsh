import { findParents } from "@/lib/utils";

import { Category } from "../header/typing";
import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";

export function useParseUrl(categories: Category[]) {
  const params = useParams<{ category: string }>();
  const searchParams = useSearchParams();
  const parents = useMemo(() => {
    return findParents(categories, params.category);
  }, [categories]);

  return { keywords: searchParams.get("keywords"), breadcrumb: parents };
}

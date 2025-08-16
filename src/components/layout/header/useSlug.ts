"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";

import { findParents } from "@/lib/utils";

import type { Category } from "./typing";

export function useSlug(categories: Category[]) {
  const params = useParams<{ category: string }>();

  return useMemo(() => {
    const s = params.category;
    return { slug: s, pSlug: findParents(categories, s)?.at(-1)?.id || "0" };
  }, [params, categories]);
}

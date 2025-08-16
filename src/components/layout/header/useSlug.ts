"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { findPath } from "@/lib/utils";

import type { Category } from "./typing";

export function useSlug(categories: Category[]) {
  const params = useParams<{ category: string }>();

  return useMemo(() => {
    const s = params.category;
    return { slug: s, pSlug: findPath(categories, s)?.at(-2)?.key };
  }, [params, categories]);
}

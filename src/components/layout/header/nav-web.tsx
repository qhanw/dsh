"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import { navIcon } from "./nav-icons";

import { useSlug } from "./useSlug";
import type { Category } from "./typing";

type NavWebProps = { categories: Category[] };

export const NavWeb = ({ categories }: NavWebProps) => {
  const { slug, pSlug } = useSlug(categories);
  return (
    <div className="max-lg:hidden container mx-auto flex items-center h-16">
      <Logo />
      <nav
        className="flex ml-8 flex-shrink-0 overflow-x-auto no-scrollbar"
        style={{ overflow: "visible" }}
        aria-label="主导航"
      >
        <ul className="flex space-x-3">
          {[
            { id: "0", key: "", name: "首页" },
            ...(categories || [])?.slice(0, 4),
          ].map((c) => {
            const Icon = navIcon(c.id);

            const active =
              slug === c.key ||
              (!slug && !c.key) || // 首页
              (c.key && pSlug === c.key);
            return (
              <li key={c.id}>
                <Link
                  href={`/${c.key}`}
                  title={c.name}
                  className={cn(
                    "inline-flex items-center whitespace-nowrap",
                    "text-base text-white/85 hover:text-white",
                    "py-2 px-3 rounded-md",
                    "transition-colors",
                    active && "text-white font-semibold bg-white/35 shadow-md"
                  )}
                >
                  <Icon size={18} className="mr-2" />
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <SearchBar />
    </div>
  );
};

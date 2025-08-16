"use client";
import { useMemo } from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

import { navIcon } from "../nav-icons";

import { useSlug } from "../useSlug";

import type { Category } from "../typing";

type NavAccordionProps = { categories: Category[]; onClose?: () => void };

export function NavAccordion({ categories, onClose }: NavAccordionProps) {
  // 计算菜单选中状态
  const { slug, pSlug } = useSlug(categories);

  // 或许取图标
  const Home = useMemo(() => navIcon("0"), []);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full p-4 space-y-2 mb-4"
      defaultValue={pSlug?.toString()}
      aria-label="移动端分类导航"
    >
      {/* 首页 */}
      <AccordionItem value="0" className="border-b-0 items-start">
        <Link href="/" title="首页" onClick={onClose}>
          <AccordionTrigger
            className={cn(
              // 重置基础样式
              "items-center hover:no-underline cursor-pointer",
              "py-3 px-4 rounded-lg transition-colors",
              "text-base text-gray-700 font-medium",

              // 调整右侧箭头图标样式
              "[&>svg]:hidden",

              // 打开样式
              "hover:bg-primary/10",
              "[&[data-state=open]]:bg-primary/65",
              "[&[data-state=open]]:text-white",

              // 选中状态
              !pSlug &&
                "bg-primary! text-white [&>svg]:text-white hover:bg-primary/85!"
            )}
          >
            <span className="inline-flex items-center gap-3">
              <Home size={18} />
              首页
            </span>
          </AccordionTrigger>
        </Link>
      </AccordionItem>

      {categories.map((c) => {
        const Icon = navIcon(c.id);
        return (
          <AccordionItem key={c.id} value={c.key} className="border-b-0">
            <AccordionTrigger
              className={cn(
                // 重置基础样式
                "items-center hover:no-underline cursor-pointer",
                "py-3 px-4 rounded-lg transition-colors",
                "text-base text-gray-700 font-medium",

                // 调整右侧箭头图标样式
                "[&[data-state=closed]>svg]:-rotate-90",
                "[&[data-state=open]>svg]:rotate-0",
                "[&[data-state=open]>svg]:text-white",

                // 打开样式
                "hover:bg-primary/10",
                "[&[data-state=open]]:bg-primary/65",
                "[&[data-state=open]]:text-white",

                // 选中状态
                c.key === pSlug &&
                  "bg-primary! text-white [&>svg]:text-white hover:bg-primary/85!"
              )}
            >
              <span className="inline-flex items-center gap-3">
                <Icon size={18} />
                {c.name}
              </span>
            </AccordionTrigger>

            <AccordionContent className="flex flex-wrap gap-2 pl-2 pb-0 pt-2">
              {c.children?.map((it) => (
                <Link
                  onClick={onClose}
                  href={`/${it.key}`}
                  key={it.id}
                  title={it.name}
                  className={cn(
                    "px-3 py-1.5 cursor-pointer transition-colors",
                    "rounded-full border border-gray-300",
                    "text-sm font-medium text-gray-700",
                    slug === it.key
                      ? "bg-primary text-white border-primary"
                      : "hover:bg-primary/15 hover:text-primary hover:border-primary/65"
                  )}
                >
                  {it.name}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Home, Film } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

import { navIcon } from "../nav-icons";

import type { Category } from "../typing";

type NavAccordionProps = { categories: Category };

export function NavAccordion({ categories }: NavAccordionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // 从URL参数中获取当前选中的tagId
  const urlTagIds = searchParams.get("tagIds");
  const currentTagId = useMemo(() => {
    if (urlTagIds) {
      try {
        const tagIds = JSON.parse(urlTagIds);
        if (Array.isArray(tagIds) && tagIds.length > 0) {
          return tagIds[0];
        }
      } catch (error) {
        console.error("Failed to parse tagIds:", error);
      }
    }
    return null;
  }, [urlTagIds]);

  // 根据URL参数初始化展开状态
  useEffect(() => {
    if (currentTagId && categories.length > 0) {
      for (const category of categories) {
        const foundChild = category.children?.find(
          (child) => child.id === currentTagId
        );
        if (foundChild) {
          setExpandedCategory(category.id);
          break;
        }
      }
    }
  }, [currentTagId, categories]);

  // 处理子菜单点击，使用客户端路由
  const handleSubCategoryClick = (subCategoryId: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("tagIds", JSON.stringify([subCategoryId]));
    // 清除keywords参数，因为现在是按分类筛选
    newSearchParams.delete("keywords");

    router.push(`/?${newSearchParams.toString()}`);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full p-4 space-y-2"
      defaultValue="item-1"
      aria-label="移动端分类导航"
    >
      {/* 首页 */}
      <AccordionItem value="item-10" className="border-b-0 items-start">
        <AccordionTrigger
          className={cn(
            "items-center hover:no-underline cursor-pointer",
            "py-3 px-4 rounded-lg transition-colors",
            "text-base text-gray-700 font-medium",

            pathname === "/" ? "bg-primary text-white" : "hover:bg-primary/10"
          )}
        >
          <span className="inline-flex items-center gap-3 [&+svg]:hidden">
            <Home size={18} />
            首页
          </span>
        </AccordionTrigger>
      </AccordionItem>

      {categories.map((c) => {
        const Icon = navIcon(c.id);
        return (
          <AccordionItem key={c.id} value={c.name} className="border-b-0">
            <AccordionTrigger
              className={cn(
                "items-center hover:no-underline cursor-pointer",
                "py-3 px-4 rounded-lg transition-colors",
                "text-base text-gray-700 font-medium",
                "[&[data-state=closed]>svg]:-rotate-90",
                "[&[data-state=open]>svg]:rotate-0",
                "[&[data-state=open]>svg]:text-white",

                expandedCategory === c.id ||
                  (currentTagId &&
                    c.children?.some((it) => it.id === currentTagId))
                  ? "bg-primary text-white"
                  : "hover:bg-primary/10"
              )}
              onClick={() => {
                setExpandedCategory(expandedCategory === c.id ? null : c.id);
              }}
            >
              <span className="inline-flex items-center gap-3">
                <Icon size={18} />
                {c.name}
              </span>
            </AccordionTrigger>

            <AccordionContent className="flex flex-wrap gap-2 pl-2 pb-0 pt-2">
              {expandedCategory === c.id &&
                c.children?.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => handleSubCategoryClick(it.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full cursor-pointer text-sm font-medium text-gray-700 transition-colors border",
                      currentTagId === it.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white hover:bg-primary/15 hover:text-primary border-gray-300"
                    )}
                  >
                    {it.name}
                  </button>
                ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

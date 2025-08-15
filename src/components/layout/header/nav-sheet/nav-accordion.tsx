"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

import { navIcon } from "../nav-icons";

import type { Category } from "../typing";
import { useMemo } from "react";

type NavAccordionProps = { categories: Category };

export function NavAccordion({ categories }: NavAccordionProps) {
  const params = useParams();

  console.log("params", params);

  const Home = useMemo(() => navIcon("0"), []);
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full p-4 space-y-2"
      defaultValue={(params.category as string) || "0"}
      aria-label="移动端分类导航"
    >
      {/* 首页 */}
      <AccordionItem value="0" className="border-b-0 items-start">
        <Link href="/" title="首页">
          <AccordionTrigger
            className={cn(
              "items-center hover:no-underline cursor-pointer",
              "py-3 px-4 rounded-lg transition-colors",
              "text-base text-gray-700 font-medium",
              "hover:bg-primary/10",
              "[&[data-state=open]]:bg-primary",
              "[&[data-state=open]]:text-white"
            )}
          >
            <span className="inline-flex items-center gap-3 [&+svg]:hidden">
              <Home size={18} />
              首页
            </span>
          </AccordionTrigger>
        </Link>
      </AccordionItem>

      {categories.map((c) => {
        const Icon = navIcon(c.id);
        return (
          <AccordionItem key={c.id} value={c.id} className="border-b-0">
            <AccordionTrigger
              className={cn(
                "items-center hover:no-underline cursor-pointer",
                "py-3 px-4 rounded-lg transition-colors",
                "text-base text-gray-700 font-medium",
                "[&[data-state=closed]>svg]:-rotate-90",
                "[&[data-state=open]>svg]:rotate-0",
                "[&[data-state=open]>svg]:text-white",

                "hover:bg-primary/10",
                "[&[data-state=open]]:bg-primary/65",
                "[&[data-state=open]]:text-white"
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
                  href={`/${it.id}`}
                  key={it.id}
                  className={cn(
                    "px-3 py-1.5 rounded-full cursor-pointer text-sm font-medium text-gray-700 transition-colors border",
                    (params.category as string) === it.id
                      ? "bg-primary text-white border-primary"
                      : "bg-white hover:bg-primary/15 hover:text-primary border-gray-300"
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

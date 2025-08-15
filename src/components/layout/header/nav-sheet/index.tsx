"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NavAccordion } from "./nav-accordion";

import type { Category } from "../typing";

type NavSheetProps = { categories: Category };

export function NavSheet({ categories }: NavSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="transition-all duration-200
          text-sm text-white/85 hover:text-white
          bg-transparent hover:bg-transparent 
          border-none shadow-none
          cursor-pointer"
        >
          更多
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader className="border-b border-gray-200">
          <SheetTitle>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-gray-900">乡村电影</span>
            </div>
          </SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
        </SheetHeader>

        <NavAccordion categories={categories} />
      </SheetContent>
    </Sheet>
  );
}

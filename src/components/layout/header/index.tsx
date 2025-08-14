import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { queryCategories } from "@/actions/queryCategories";

import { NavWeb } from "./nav-web";
import { NavMobile } from "./nav-mobile";

export async function Header() {
  const list = await queryCategories();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className={cn("fixed top-0 left-0 right-0 z-50 bg-primary")}>
        <NavWeb categories={list} />
        <NavMobile categories={list} />
      </header>
    </Suspense>
  );
}

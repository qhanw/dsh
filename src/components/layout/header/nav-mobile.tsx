"use client";

import { useRef } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { NavSheet } from "./nav-sheet";
import { SearchBar } from "./search-bar";
import { Logo } from "./logo";

import { useSlug } from "./useSlug";
import type { Category } from "./typing";

type NavMobileProps = { categories: Category[] };

export function NavMobile({ categories }: NavMobileProps) {
  const { slug, pSlug } = useSlug(categories);

  // 修复：添加必要的 state 和 hooks
  // const [isScrolled, setIsScrolled] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const router = useRouter();
  // const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  // const activeNavRef = useRef<HTMLAnchorElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 0);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   if (isMobileMenuOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [isMobileMenuOpen]);

  // 添加选中菜单的滑动效果
  // useEffect(() => {
  //   if (activeNavRef.current && mobileNavRef.current) {
  //     const container = mobileNavRef.current;
  //     const activeElement = activeNavRef.current;
  //     const containerRect = container.getBoundingClientRect();
  //     const activeRect = activeElement.getBoundingClientRect();

  //     // 计算需要滚动的距离，让选中的菜单居中显示
  //     const scrollLeft =
  //       activeRect.left +
  //       activeRect.width / 2 -
  //       containerRect.left -
  //       containerRect.width / 2;

  //     container.scrollTo({
  //       left: scrollLeft,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [pathname, categories]);

  // 添加选中菜单的滑动效果
  // useEffect(() => {
  //   if (activeNavRef.current && mobileNavRef.current) {
  //     const container = mobileNavRef.current;
  //     const activeElement = activeNavRef.current;
  //     const containerRect = container.getBoundingClientRect();
  //     const activeRect = activeElement.getBoundingClientRect();

  //     // 计算需要滚动的距离，让选中的菜单居中显示
  //     const scrollLeft =
  //       activeRect.left +
  //       activeRect.width / 2 -
  //       containerRect.left -
  //       containerRect.width / 2;

  //     container.scrollTo({
  //       left: scrollLeft,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [pathname, categories]);

  return (
    <>
      <div className="lg:hidden p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Logo />
          <SearchBar className="max-w-full" />
        </div>

        <div className="flex items-center">
          <div
            ref={mobileNavRef}
            className={cn(
              "flex space-x-1 flex-1",
              "overflow-x-auto scroll-smooth no-scrollbar"
            )}
          >
            {[
              { id: "0", key: "", name: "首页" },
              ...categories?.slice(0, 4),
            ].map((c) => {
              const active =
                slug === c.key ||
                (!slug && !c.key) ||
                (c.key && pSlug === c.key);
              return (
                <Link
                  key={c.id}
                  href={`/${c.key}`}
                  title={c.name}
                  className={cn(
                    "py-2 px-3 rounded-md",
                    "transition-all duration-200",
                    "text-sm font-semibold text-white/85 hover:text-white",
                    active && "relative ease-in text-white  bg-white/25"
                  )}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>

          {/* 右侧更多按钮 - 固定位置 */}
          <NavSheet categories={categories} />
        </div>
      </div>

      {/* 移动端底部导航 - Tabbar - 暂时隐藏 */}
      {/* <nav
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
        aria-label="移动端导航"
      >
        <ul className="flex justify-around">
          {SITE_CONFIG.nav.mobile.map((item) => {
            const Icon = navIcon(item.id, Menu);
            const isActive = item.path
              ? item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path)
              : false;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMobileNavClick(item)}
                  className={cn(
                    "flex flex-col items-center py-2 px-3 transition-colors",
                    isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                  )}
                  aria-label={item.name}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "mb-1",
                      isActive ? "text-blue-600" : "text-gray-600"
                    )}
                  />
                  <span className="text-xs">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav> */}
    </>
  );
}

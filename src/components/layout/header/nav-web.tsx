"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Home, Film } from "lucide-react";
import { cn } from "@/lib/utils";

import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import { navIcon } from "./nav-icons";

import type { Category } from "./typing";

// 在文件开头添加 props 接口
type NavWebProps = { categories?: Category[] };

export const NavWeb = ({ categories }: NavWebProps = {}) => {
  // 修复：添加必要的 state 和 hooks
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const activeNavRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // 添加选中菜单的滑动效果
  useEffect(() => {
    if (activeNavRef.current && mobileNavRef.current) {
      const container = mobileNavRef.current;
      const activeElement = activeNavRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      // 计算需要滚动的距离，让选中的菜单居中显示
      const scrollLeft =
        activeRect.left +
        activeRect.width / 2 -
        containerRect.left -
        containerRect.width / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [pathname, categories]);

  // 添加选中菜单的滑动效果
  useEffect(() => {
    if (activeNavRef.current && mobileNavRef.current) {
      const container = mobileNavRef.current;
      const activeElement = activeNavRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      // 计算需要滚动的距离，让选中的菜单居中显示
      const scrollLeft =
        activeRect.left +
        activeRect.width / 2 -
        containerRect.left -
        containerRect.width / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [pathname, categories]);

  return (
    <div
      className="max-lg:hidden container mx-auto"
      style={{ overflow: "visible" }}
    >
      <div className="flex items-center h-16 px-8">
        <Logo />

        {/* 桌面端导航 */}
        <nav
          className="flex items-center space-x-6 ml-8 flex-shrink-0 overflow-x-auto scrollbar-hide"
          style={{ overflow: "visible" }}
          aria-label="主导航"
        >
          <ul className="flex items-center space-x-6">
            <li>
              <a
                href="/"
                className={cn(
                  "text-base text-white/90 hover:text-white transition-colors flex items-center space-x-1 whitespace-nowrap py-1.5 px-2 rounded-md"
                  // searchParams.get("tagIds") === null &&
                  //   "text-white font-semibold bg-white/30 shadow-md"
                )}
              >
                <Home size={18} />
                <span>首页</span>
              </a>
            </li>
            {categories?.slice(0, 4).map((c) => {
              const Icon = navIcon(c.id);
              return (
                <li
                  key={c.id}
                  className="relative flex-shrink-0"
                  style={{ zIndex: 1000 }}
                >
                  <a
                    href={`/?tagIds=${JSON.stringify([c.id])}`}
                    className={cn(
                      "flex items-center space-x-1 text-base text-white/90 hover:text-white transition-colors whitespace-nowrap py-1.5 px-2 rounded-md"
                      // searchParams.get("tagIds") ===
                      //   JSON.stringify([category.tag_id]) &&
                      //   "text-white font-semibold bg-white/30 shadow-md"
                    )}
                  >
                    <Icon size={18} />
                    <span>{c.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <SearchBar />
      </div>
    </div>
  );
};

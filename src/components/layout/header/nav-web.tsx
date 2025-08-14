"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Home, Film, Tv, Play, Newspaper, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site-config";

import type { Category } from "./typing";

// 导航图标映射
const NAV_ICONS: Record<string, any> = {
  首页: Home,
  影片: Film,
  连续剧: Tv,
  综艺片: Play,
  新闻资讯: Newspaper,
};

// 在文件开头添加 props 接口
type NavWebProps = { categories?: Category; currentTagId?: number };

export const NavWeb = ({ categories, currentTagId }: NavWebProps = {}) => {
  // 修复：添加必要的 state 和 hooks
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();
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

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      // 构建搜索参数
      const params = new URLSearchParams();
      params.set("keywords", searchKeyword.trim());
      // 如果当前在某个分类页面，添加对应的tagIds
      const currentCategoryId = pathname.match(/\/category\/(\d+)/)?.[1];
      if (currentCategoryId) {
        params.set("tagIds", JSON.stringify([parseInt(currentCategoryId)]));
      }
      // 跳转到搜索结果页面
      router.push(`/?${params.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    // 清空后跳转到首页，不带搜索参数，自动请求最新列表
    router.push("/");
    // 聚焦到搜索框
    const searchInput = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  const handleMobileNavClick = (item: (typeof SITE_CONFIG.nav.mobile)[0]) => {
    if (item.path === null) {
      setIsMobileMenuOpen(true);
    } else if (item.path) {
      // 如果是有效的路径，直接跳转
      window.location.href = item.path;
    }
  };

  return (
    <div
      className="hidden lg:block container mx-auto"
      style={{ overflow: "visible" }}
    >
      <div className="flex items-center h-16 px-8">
        {/* Logo和标题 */}
        <a href="/" className="flex items-center space-x-3 flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={SITE_CONFIG.logo.image} alt="Logo" className="w-8 h-8" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xl font-bold text-white leading-tight truncate">
              {SITE_CONFIG.shortName}
            </span>
          </div>
        </a>

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
              const Icon = NAV_ICONS[c.name] || Film;
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

        {/* 桌面端搜索框 */}
        <div className="flex-1 max-w-md ml-8">
          <form
            className="relative flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="搜索视频..."
              className="flex-1 h-10 px-4 bg-white text-gray-700 focus:outline-none rounded-l-full"
              aria-label="搜索视频"
            />
            {/* 清空按钮 */}
            {searchKeyword && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="清空搜索"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="submit"
              className="flex items-center justify-center h-10 px-6 bg-white rounded-r-full text-gray-700 hover:bg-gray-50 border-l border-gray-200"
              aria-label="搜索"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

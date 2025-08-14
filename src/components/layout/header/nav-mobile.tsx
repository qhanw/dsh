"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Home, Film, Tv, Play, Newspaper, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./mobile-menu";
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

type NavMobileProps = { categories: Category };

export function NavMobile({ categories }: NavMobileProps) {
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
    <>
      {/* 移动端顶部布局 */}
      <div className="lg:hidden">
        {/* 第一行：Logo + 搜索框 */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Logo和标题 */}
            <a href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src={SITE_CONFIG.logo.image}
                  alt="Logo"
                  className="w-6 h-6"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-bold text-white leading-tight truncate">
                  {SITE_CONFIG.shortName}
                </span>
              </div>
            </a>
            {/* 搜索框 */}
            <div className="flex-1 min-w-0">
              <form
                className="relative flex bg-white rounded-full"
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
                  className="flex-1 h-9 px-4 text-sm text-gray-700 focus:outline-none bg-transparent rounded-l-full"
                  aria-label="搜索视频"
                />
                {/* 移动端清空按钮 */}
                {searchKeyword && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-9 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="清空搜索"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="submit"
                  className="flex items-center justify-center h-9 w-9 text-gray-700 rounded-r-full"
                  aria-label="搜索"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 第二行：导航按钮 - 参考蓝色导航栏设计 */}
        <div className="px-4 pb-3">
          <div className="flex items-center">
            {/* 左侧导航按钮 - 可滚动，添加滑动效果 */}
            <div
              ref={mobileNavRef}
              className="flex items-center space-x-1 mobile-nav-container flex-1"
            >
              <a
                href="/"
                // ref={
                //   searchParams.get("tagIds") === null ? activeNavRef : null
                // }
                className={cn(
                  "mobile-nav-item flex items-center justify-center text-sm text-white/90 hover:text-white transition-all duration-200 py-2.5 px-4 rounded-md font-medium"
                  // searchParams.get("tagIds") === null &&
                  //   "mobile-nav-active text-white font-semibold bg-white/25"
                )}
              >
                <span>首页</span>
              </a>
              {categories?.slice(0, 4).map((c) => {
                // const isActive =
                //   searchParams.get("tagIds") ===
                //   JSON.stringify([c.id]);
                return (
                  <a
                    key={c.id}
                    href={`/?tagIds=${JSON.stringify([c.id])}`}
                    // ref={isActive ? activeNavRef : null}
                    className={cn(
                      "mobile-nav-item flex items-center justify-center text-sm text-white/90 hover:text-white transition-all duration-200 py-2.5 px-4 rounded-md font-medium"
                      // isActive &&
                      //   "mobile-nav-active text-white font-semibold bg-white/25"
                    )}
                  >
                    <span>{c.name}</span>
                  </a>
                );
              })}
            </div>

            {/* 右侧更多按钮 - 固定位置 */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-center text-sm text-white/90 hover:text-white transition-all duration-200 whitespace-nowrap py-2.5 px-4 rounded-md font-medium ml-2 flex-shrink-0"
            >
              <span>更多</span>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端底部导航 - 暂时隐藏 */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 hidden"
        aria-label="移动端导航"
      >
        <ul className="flex justify-around">
          {SITE_CONFIG.nav.mobile.map((item) => {
            const Icon = NAV_ICONS[item.name] || Menu;
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
      </nav>

      {/* 移动端菜单遮罩层和菜单 */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        </>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/cfg/site-config";

type SearchBarProps = React.ComponentProps<"div">;

export function SearchBar({ className }: SearchBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

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

  const onKeyUp = (e: React.KeyboardEvent) => {
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
    <div className={cn("flex-1 max-w-md ml-8 flex relative", className)}>
      <Input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyUp={onKeyUp}
        placeholder="搜索视频..."
        className="flex-1 h-10 px-6 bg-white/85 text-base font-semibold text-gray-700 focus-visible:border-none rounded-l-full"
        aria-label="搜索视频"
      />
      {/* 清空按钮 */}
      {searchKeyword && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-14 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="清空搜索"
        >
          <X size={16} />
        </button>
      )}
      <Button
        type="submit"
        size="lg"
        className="cursor-pointer pr-5! bg-white/85 rounded-r-full text-gray-700 hover:bg-white/90 border-l border-white/35"
        aria-label="搜索"
        onClick={() => handleSearch()}
      >
        <Search size={20} />
      </Button>
    </div>
  );
}

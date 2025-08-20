"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type SearchBarProps = React.ComponentProps<"div">;

export function SearchBar({ className }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const k = searchParams.get("keywords");

  const [keywords, setKeywords] = useState(k || "");
  const router = useRouter();

  useEffect(() => {
    if (k) setKeywords(k);
  }, [k]);

  const onSearch = () => {
    if (keywords.trim()) {
      // 构建搜索参数
      const params = new URLSearchParams();
      params.set("keywords", keywords.trim());

      // 跳转到搜索结果页面
      router.push(`/search?${params.toString()}`);
    }
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  const onClearSearch = () => {
    setKeywords("");

    router.push("/");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("flex-1 max-w-md ml-8 flex relative", className)}>
      <Input
        ref={inputRef}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        onKeyUp={onKeyUp}
        placeholder="搜索视频..."
        className="flex-1 h-10 px-6 bg-white/85 text-base font-semibold text-gray-700 focus-visible:border-none rounded-l-full"
        aria-label="搜索视频"
      />
      {/* 清空按钮 */}
      {keywords && (
        <button
          type="button"
          onClick={onClearSearch}
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
        onClick={onSearch}
      >
        <Search size={20} />
      </Button>
    </div>
  );
}

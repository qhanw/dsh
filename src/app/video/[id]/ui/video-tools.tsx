"use client";

import { useState } from "react";
import { Share2, Heart, ThumbsUp, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { Video } from "@/types/video";

export function VideoTools({
  data,
  className,
}: {
  data: Video;
  className?: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(25);
  const [commentCount, setCommentCount] = useState(0);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    // 这里可以打开评论对话框或跳转到评论页面
    alert("评论功能开发中...");
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: data?.name || "",
        text: data?.introduction || "",
        url: window.location.href,
      });
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("链接已复制到剪贴板");
    }
  };

  return (
    <>
      {/* 移动端 */}
      <div
        className={cn("lg:hidden flex items-center space-x-4 mt-4", className)}
      >
        <button className="flex items-center space-x-1 text-gray-600">
          <ThumbsUp size={16} />
          <span>25</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600">
          <MessageCircle size={16} />
        </button>
        <button className="flex items-center space-x-1 text-gray-600">
          <Heart size={16} />
        </button>
        <button className="flex items-center space-x-1 text-gray-600">
          <Share2 size={16} />
        </button>
      </div>

      <div className={cn("max-lg:hidden flex gap-2", className)}>
        <button
          onClick={handleFavorite}
          className={`flex-1 py-2 px-4 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
            isFavorite
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "已收藏" : "收藏"}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-2 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          分享
        </button>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Share2, Heart, Download } from "lucide-react";

import { Video } from "@/types/video";

export function VideoTools({
  data,
  episode,
}: {
  data: Video;
  episode: number;
  className?: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  // const [isLiked, setIsLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(25);
  // const [commentCount, setCommentCount] = useState(0);

  const onFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // const handleLike = () => {
  //   setIsLiked(!isLiked);
  //   setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  // };

  const onComment = () => {
    // 这里可以打开评论对话框或跳转到评论页面
    toast.warning("评论功能开发中...");
  };

  const onShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: data.name || "",
        text: `正在观看 ${data.name} 第${episode}集`,
        url: window.location.href,
      });
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.warning("链接已复制到剪贴板");
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onFavorite}
        className={`p-2 rounded-full transition-colors ${
          isFavorite
            ? "bg-red-500 text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
        }`}
      >
        <Heart className={`size-5 ${isFavorite ? "fill-current" : ""}`} />
      </button>
      <button
        onClick={onShare}
        className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
      >
        <Share2 className="size-5" />
      </button>
      <button className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
        <Download className="size-5" />
      </button>
    </div>
  );
}

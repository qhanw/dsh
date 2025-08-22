"use client";

import { useState } from "react";
import { Share2, Heart, ThumbsUp, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Video } from "@/types/video";
import { Button } from "@/components/ui/button";

export function VideoTools({
  data,
  isMobile = false,
  className,
}: {
  data: Video;
  isMobile?: boolean;
  className?: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  //   const [isLiked, setIsLiked] = useState(false);
  //   const [likeCount, setLikeCount] = useState(25);

  const onFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const onLike = () => {
    // setIsLiked(!isLiked);
    // setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    toast.warning("点赞功能开发中...");
  };

  const onComment = () => {
    // 这里可以打开评论对话框或跳转到评论页面
    toast.warning("评论功能开发中...");
  };

  const onShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: data?.name || "",
        text: data?.introduction || "",
        url: window.location.href,
      });
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.warning("链接已复制到剪贴板");
    }
  };

  if (isMobile) {
    return (
      <div className={cn("mt-4 -ml-2", className)}>
        <Button onClick={onLike} variant="ghost" className="cursor-pointer">
          <ThumbsUp />
          <span>25</span>
        </Button>
        <Button
          onClick={onComment}
          variant="ghost"
          size="icon"
          className="cursor-pointer"
        >
          <MessageCircle />
        </Button>
        <Button
          onClick={onFavorite}
          variant="ghost"
          size="icon"
          className={cn("cursor-pointer", isFavorite && "text-destructive!")}
        >
          <Heart />
        </Button>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Share2 />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3", className)}>
      <Button
        size="lg"
        onClick={onFavorite}
        variant={isFavorite ? "destructive" : "outline"}
        className="cursor-pointer flex-1"
      >
        <Heart className={cn(isFavorite && "fill-current")} />
        {isFavorite ? "已收藏" : "收藏"}
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={onShare}
        className="cursor-pointer flex-1"
      >
        <Share2 />
        分享
      </Button>
    </div>
  );
}

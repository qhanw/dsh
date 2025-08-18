"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export function BackButton({
  fallback = "/",
  className,
}: {
  fallback?: string;
  className?: string;
}) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // history.length > 1 表示有上一页
    if (window.history.length > 1) {
      setCanGoBack(true);
    }
  }, []);

  const onBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Button size="lg" onClick={onBack} className={cn(className)}>
      ← 返回
    </Button>
  );
}

"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Video } from "@/types/video";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

function LinksList({ children, className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PlayList({ data }: { data: Video }) {
  const { id, playLinks: links = [] } = data;
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const showMin = useMemo(() => {
    return (
      <LinksList>
        {links.slice(0, 12).map((c, idx) => (
          <Button
            asChild
            key={idx}
            className={cn(
              "bg-gray-100 text-gray-700",
              "hover:bg-primary/65 hover:text-white"
            )}
          >
            <Link href={`/play/${id}/${idx + 1}`}>{c.title}</Link>
          </Button>
        ))}
      </LinksList>
    );
  }, [links]);

  const showRemain = useMemo(() => {
    return (
      <LinksList
        className={cn(
          "mt-3 overflow-hidden transition-all duration-500",
          showAllEpisodes ? "max-h-[1500px]" : "max-h-0"
        )}
      >
        {links.slice(12).map((c, idx) => (
          <Button
            asChild
            key={idx}
            className={cn(
              "bg-gray-100 text-gray-700",
              "hover:bg-primary/65 hover:text-white"
            )}
          >
            <Link href={`/play/${id}/${idx + 1}`}>{c.title}</Link>
          </Button>
        ))}
      </LinksList>
    );
  }, [links, showAllEpisodes]);

  return (
    <Card className="border-gray-100">
      <CardHeader className="flex items-center">
        <CardTitle className="flex-1 inline-block items-center">
          播放列表
          {links.length && (
            <span className="text-sm text-gray-500 font-normal ml-2">
              ({links.length}集)
            </span>
          )}
        </CardTitle>

        {/* 展开/收起按钮 */}
        {links.length > 12 && (
          <CardAction>
            <Button
              size="sm"
              onClick={() => setShowAllEpisodes(!showAllEpisodes)}
              className="cursor-pointer"
            >
              {showAllEpisodes ? "收起" : `展开全部 (${links.length}集)`}
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        {links.length ? (
          <>
            {showMin}
            {showRemain}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>暂无播放列表</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

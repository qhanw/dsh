"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PlayLink } from "@/types/video";

export function PlayLinks({ links }: { links: PlayLink[] }) {
  const { episode, videoId } = useParams<{
    episode: string;
    videoId: string;
  }>();

  return (
    <div className="p-4 lg:p-6">
      <h3 className="text-lg font-semibold text-white mb-4">剧集列表</h3>
      <div className="grid grid-cols-4 lg:grid-cols-3 gap-2">
        {links.map((c, idx) => (
          <Button
            key={idx}
            asChild
            className={`${
              +episode === idx + 1
                ? "bg-primary text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Link href={`/play/${videoId}/${idx + 1}`}>{c.title}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

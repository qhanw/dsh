"use client";

import { cn } from "@/lib/utils";
import { PlayLink } from "@/types/video";

import Link from "next/link";
import { useState } from "react";

export function PlayList({ links }: { links: PlayLink[] }) {
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        播放列表
        {links && links.length > 0 && (
          <span className="text-sm text-gray-500 font-normal ml-2">
            ({links.length}集)
          </span>
        )}
      </h3>

      {links && links.length > 0 ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {(showAllEpisodes ? links : links.slice(0, 12)).map(
              (link, index) => (
                <Link
                  href="/"
                  key={index}
                  className={cn(
                    "px-4 py-2 text-center rounded-lg text-sm font-medium transition-all duration-200",
                    "bg-gray-100 text-gray-700",
                    "hover:bg-primary/65 hover:text-white"
                  )}
                >
                  {link.title}
                </Link>
              )
            )}
          </div>

          {/* 展开/收起按钮 */}
          {links.length > 12 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                className="px-6 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {showAllEpisodes ? "收起" : `展开全部 (${links.length}集)`}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>暂无播放列表</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { fetchVideos } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoCard } from "@/components/video/video-card";

import { Video } from "@/types/video";
import { useEffect, useState } from "react";

export function RelatedVideos({ video }: any) {
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (video) {
      // 先加载相关视频，然后加载同类型推荐视频
      loadRelatedVideos(video);
    }
  }, [video]);

  const loadRelatedVideos = async (currentVideo: Video) => {
    try {
      const response = await fetchVideos({
        pageNum: 0,
        pageSize: 8,
        keywords: currentVideo.name.split(" ")[0],
      });

      if (response.code === 200) {
        const filtered = response.data.list.filter(
          (v) => v.id !== currentVideo.id
        );
        setRelatedVideos(filtered.slice(0, 6));
      }
    } catch (err) {
      console.error("加载相关视频失败:", err);
    }
  };

  if (!relatedVideos.length) return null;

  return (
    <Card className="border-gray-100">
      <CardHeader>
        <CardTitle>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm mr-3">
            推荐
          </span>
          相关推荐
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {(() => {
            // 去重处理
            const uniqueRelatedVideos = relatedVideos.filter(
              (video, index, self) =>
                index === self.findIndex((v) => v.id === video.id)
            );

            return uniqueRelatedVideos.map((relatedVideo, index) => (
              <div
                key={`related-${relatedVideo.id}`}
                className="group cursor-pointer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = `/video/${relatedVideo.id}`;
                  }
                }}
              >
                <VideoCard video={relatedVideo} />
                <div className="mt-2 text-center">
                  <h4 className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {relatedVideo.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {relatedVideo.period} • {relatedVideo.region}
                  </p>
                </div>
              </div>
            ));
          })()}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Video } from "@/types/video";

import { fetchSimilarVideos } from "@/lib/api";

export function SimilarVideos({ video }: any) {
  const [similarVideos, setSimilarVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (video) {
      loadSimilarVideos(video);
    }
  }, [video]);

  const loadSimilarVideos = async (currentVideo: Video) => {
    try {
      const response = await fetchSimilarVideos(currentVideo);

      if (response.code === 200) {
        // 确保不包含当前视频和已存在的相关视频
        const existingIds = new Set([
          currentVideo.id,
          //...relatedVideos.map((v) => v.id),
        ]);
        const filtered = response.data.list.filter(
          (v) => !existingIds.has(v.id)
        );
        setSimilarVideos(filtered.slice(0, 10));
      }
    } catch (err) {
      console.error("加载同类型推荐视频失败:", err);
    }
  };

  if (!similarVideos.length) return null;

  return (
    <Card className="border-gray-100">
      <CardHeader>
        <CardTitle>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm mr-3">
            同类型
          </span>
          推荐视频
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {(() => {
            // 去重处理
            const uniqueSimilarVideos = similarVideos.filter(
              (video, index, self) =>
                index === self.findIndex((v) => v.id === video.id)
            );

            return uniqueSimilarVideos.map((similarVideo, index) => (
              <div
                key={`similar-${similarVideo.id}`}
                className="group cursor-pointer"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = `/video/${similarVideo.id}`;
                  }
                }}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={similarVideo.image || "/logo.png"}
                    alt={similarVideo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/logo.png";
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {similarVideo.statusStr}
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {similarVideo.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {similarVideo.period} • {similarVideo.region}
                  </p>
                  {similarVideo.playLinks &&
                    similarVideo.playLinks.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {similarVideo.playLinks.length}集
                      </p>
                    )}
                </div>
              </div>
            ));
          })()}
        </div>
      </CardContent>
    </Card>
  );
}

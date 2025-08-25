import Link from "next/link";
import { Play } from "lucide-react";

import { Video } from "@/types/video";
import { VideoCover } from "./video-cover";
import { VideoTools } from "./video-tools";

import { RelatedVideos } from "./related-videos";
import { SimilarVideos } from "./similar-videos";
import { PlayList } from "./play-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VideoBaseInfo } from "./video-base-info";
import { VideoIntroduction } from "./video-introduction";

type DetailsMobileProps = { video: Video };

export function DetailsMain({ video }: DetailsMobileProps) {
  return (
    <div className={cn("flex flex-col gap-8", "lg:flex-row")}>
      {/* 左侧：视频海报和信息 */}
      <div className="lg:w-1/3">
        {/* 视频海报 */}
        <VideoCover data={video} className="max-lg:hidden" />

        {/* 操作按钮 */}
        <div className="space-y-3 mt-8 mb-3 max-lg:mt-3">
          <Button
            disabled={!video.playLinks?.length}
            asChild
            size="lg"
            className="bg-primary w-full"
          >
            <Link
              href={`/play/${video.id}/1`}
              title={video.name || video.enname}
            >
              <Play className="size-4" />
              立即播放
            </Link>
          </Button>

          <VideoTools data={video} />

          <div className="text-center text-sm text-gray-500">
            高清HD-720P线路-免费-在线播放器-无删减版本
          </div>
        </div>
      </div>

      {/* 右侧：视频信息 */}
      <div className="lg:w-2/3 space-y-6">
        {/* 视频标题 */}
        <div className="mb-6 max-lg:hidden">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {video.name}
          </h1>
          {video.enname && (
            <h2 className="text-xl text-gray-600 mb-4">{video.enname}</h2>
          )}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>{video.period}</span>
            <span>•</span>
            <span>{video.region}</span>
            <span>•</span>
            <span>{video.language}</span>
          </div>
        </div>

        {/* 视频基本信息 */}
        <VideoBaseInfo data={video} />

        {/* 播放列表 */}
        <PlayList data={video} />

        {/* 视频简介 */}
        <VideoIntroduction name={video.name} intro={video.introduction} />

        <RelatedVideos video={video} />

        <SimilarVideos video={video} />
      </div>
    </div>
  );
}

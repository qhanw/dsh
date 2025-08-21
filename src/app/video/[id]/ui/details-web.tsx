import { Play } from "lucide-react";

import { Video } from "@/types/video";
import { VideoCover } from "./video-cover";
import { VideoTools } from "./video-tools";
import Link from "next/link";

import { RelatedVideos } from "./related-videos";
import { SimilarVideos } from "./similar-videos";
import { PlayList } from "./play-list";

type DetailsMobileProps = { video: Video };

export function DetailsWeb({ video }: DetailsMobileProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 左侧：视频海报和信息 */}
      <div className="lg:w-1/3">
        {/* 视频海报 */}
        <VideoCover data={video} />

        {/* 操作按钮 */}
        <div className="space-y-3 mb-6">
          {video.playLinks?.length && (
            <Link
              // 默认第一集
              href={`/play/${video.id}/1`}
              className="w-full bg-primary-500 text-white text-center py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              立即播放
            </Link>
          )}

          <VideoTools data={video} className="hidden" />

          {/* 播放介绍词 - 移动到分享按钮下面 */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              高清HD-720P线路-免费-在线播放器-无删减版本
            </p>
          </div>
        </div>
      </div>

      {/* 右侧：视频信息 */}
      <div className="lg:w-2/3">
        {/* 视频标题 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {video.name}
          </h1>
          {video.enname && (
            <h2 className="text-xl text-gray-600 mb-4">{video.enname}</h2>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{video.period}</span>
            <span>•</span>
            <span>{video.region}</span>
            <span>•</span>
            <span>{video.language}</span>
          </div>
        </div>

        {/* 视频基本信息 */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">影片信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex">
              <span className="text-gray-500 w-16">片名：</span>
              <span className="text-gray-800">{video.name}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-16">状态：</span>
              <span className="text-gray-800">{video.statusStr}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-16">主演：</span>
              <span className="text-gray-800">{video.actors}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-16">导演：</span>
              <span className="text-gray-800">{video.directors}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-16">年份：</span>
              <span className="text-gray-800">{video.period}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-16">地区：</span>
              <span className="text-gray-800">{video.region}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-16">语言：</span>
              <span className="text-gray-800">{video.language}</span>
            </div>
          </div>
        </div>

        {/* 播放列表 */}
        <PlayList links={video.playLinks || []} />

        {/* 视频简介 */}
        {video.introduction && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">简介</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {(() => {
                // 优化简介内容，开头使用《电影名称》格式，并在内容中多次提到电影名称
                let optimizedIntro = video.introduction;

                // 如果简介不是以《电影名称》开头，则添加
                if (!optimizedIntro.startsWith(`《${video.name}》`)) {
                  optimizedIntro = `《${video.name}》${optimizedIntro}`;
                }

                // 在内容中多次提到电影名称（每2-3句话提到一次）
                const sentences = optimizedIntro
                  .split(/[。！？]/)
                  .filter((s) => s.trim());
                const movieName = video.name;
                let enhancedIntro = "";

                sentences.forEach((sentence, index) => {
                  if (sentence.trim()) {
                    // 每隔2-3句话添加一次电影名称
                    if (
                      index > 0 &&
                      index % 2 === 0 &&
                      !sentence.includes(movieName)
                    ) {
                      enhancedIntro += `${sentence}。${movieName}的精彩剧情继续展开，`;
                    } else {
                      enhancedIntro += `${sentence}。`;
                    }
                  }
                });

                return enhancedIntro || optimizedIntro;
              })()}
            </div>
          </div>
        )}

        <RelatedVideos video={video} />

        <SimilarVideos video={video} />
      </div>
    </div>
  );
}

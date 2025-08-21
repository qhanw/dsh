import { ArrowRightIcon } from "lucide-react";

import { Video } from "@/types/video";
import { VideoCover } from "./video-cover";
import { VideoTools } from "./video-tools";

type DetailsMobileProps = {
  video: Video;
};

export function DetailsMobile({ video }: DetailsMobileProps) {
  return (
    <div className="p-3 mb-3 flex items-start gap-4 lg:hidden">
      {/* 视频海报 */}
      <VideoCover data={video} />

      {/* 视频信息 */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">{video.name}</h1>
        {video.enname && <h2 className="text-gray-600">{video.enname}</h2>}

        <div className="flex items-center space-x-1 my-2">
          <span className="text-xl text-primary font-medium">第1集</span>
          <ArrowRightIcon className="text-gray-400" size={16} />
        </div>

        <div className="text-gray-500">
          <div>
            {video.period} / {video.region}
          </div>
          <div>{video.actors}</div>
        </div>

        <VideoTools data={video} />
      </div>
    </div>
  );
}

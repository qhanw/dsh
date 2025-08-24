import { Video } from "@/types/video";

import { VideoTools } from "./video-tools";
import { VideoIntroduction } from "./video-introduction";

type VideoInfoProps = { data: Video; episode: number };
export function VideoInfo({ data, episode }: VideoInfoProps) {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-xl lg:text-2xl font-bold text-white mb-2">
            {data.name}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>第{episode}集</span>
            {data.playLinks && <span>共{data.playLinks.length}集</span>}
            <span>{data.period}</span>
            <span>{data.region}</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <VideoTools data={data} episode={episode} />
      </div>

      {/* 视频简介 */}
      <VideoIntroduction name={data.name} intro={data.introduction} />
    </div>
  );
}

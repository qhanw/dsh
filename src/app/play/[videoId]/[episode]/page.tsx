import { getPlayPageTDK } from "@/lib/tdk";
import { queryVideoDetails } from "@/actions/queryVideoDetails";
import { BackButton } from "@/components/back-button";

import { RelatedVideos } from "./ui/related-videos";
import { PlayLinks } from "./ui/play-links";
import { SimilarVideos } from "./ui/similar-videos";
import { VideoInfo } from "./ui/video-info";
import { Player } from "./ui/player";

type Props = { params: Promise<{ videoId: string; episode: string }> };

export async function generateMetadata({ params }: Props) {
  const { videoId, episode } = await params;

  const data = await queryVideoDetails(videoId);

  if (data) return getPlayPageTDK(data, episode);

  return getPlayPageTDK({ name: "视频播放" } as any, episode);
}

export default async function PlayPage({ params }: Props) {
  const { videoId, episode } = await params;

  const data = await queryVideoDetails(videoId);

  console.log("list:", data);

  if (!data) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold mb-4">播放失败</h1>
            <p className="mb-6">{"该视频可能已被删除或不存在"}</p>
            <BackButton className="cursor-pointer" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* 视频播放区域 */}
      <div className="lg:w-2/3">
        <div className="relative bg-black">
          {/* 视频播放器 */}
          <Player
            name={data.name}
            playLink={data.playLinks[+episode - 1]}
            episode={+episode}
          />

          {/* 视频信息 */}
          <VideoInfo data={data} episode={+episode} />
        </div>
      </div>

      {/* 右侧边栏 */}
      <div className="lg:w-1/3 bg-gray-900">
        {/* 剧集列表 */}
        <PlayLinks links={data.playLinks || []} />

        {/* 同类型推荐 */}
        <SimilarVideos video={data} />

        {/* 相关推荐 */}
        <RelatedVideos video={data} />
      </div>
    </div>
  );
}

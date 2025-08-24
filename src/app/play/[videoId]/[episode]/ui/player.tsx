import { PlayLink } from "@/types/video";

type PlayerProps = { name: string; playLink: PlayLink; episode: number };

export function Player({ playLink, name, episode }: PlayerProps) {
  return (
    <div className="aspect-video relative">
      {playLink ? (
        <iframe
          src={playLink.originLink}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          title={`${name} 第${episode}集`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <div className="text-white text-center">
            <p className="text-lg mb-4">暂无播放源</p>
            <p className="text-sm text-gray-400">
              该视频暂无第{episode}集的播放源
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

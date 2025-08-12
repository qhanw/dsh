'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <article className="group relative flex flex-col">
      <Link 
        href={`/video/${video.id}`}
        className="flex flex-col"
      >
        {/* 缩略图 */}
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={video.image || '/logo.png'}
            alt={video.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
            unoptimized={!video.image}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
            <span className="text-white text-sm">{video.status_str}</span>
          </div>
        </div>

        {/* 视频信息 */}
        <div className="mt-2 space-y-1">
          <h3 className="text-sm font-medium line-clamp-1">{video.name}</h3>
          <div className="text-xs text-gray-500 space-y-1">
            <p className="line-clamp-1">{video.actors}</p>
            <p>{video.period} · {video.region}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}; 
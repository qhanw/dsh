import Link from "next/link";
import { queryRelatedVideos } from "@/actions/queryRelatedVideos";
import { Video } from "@/types/video";
import Image from "next/image";
import { convertImgUrl } from "@/lib/utils";

export async function RelatedVideos({ video }: { video: Video }) {
  const data = await queryRelatedVideos(video);

  console.log("RelatedVideos", data);

  if (!data?.length) return null;

  return (
    <div className="p-4 lg:p-6 border-t border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="bg-primary-500 text-white px-2 py-1 rounded text-xs mr-2">
          热门
        </span>
        相关推荐
      </h3>
      <div className="space-y-3">
        {data.map((c) => (
          <Link
            key={c.id}
            className="flex space-x-3 group cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors"
            href={`/video/${c.id}`}
          >
            <div className="w-20 h-12 relative bg-gray-800 rounded overflow-hidden flex-shrink-0">
              <Image
                src={convertImgUrl(c.image) || "/logo.png"}
                alt={c.name || ""}
                fill
                objectFit="cover"
                className="transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                unoptimized={!c.image}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate group-hover:text-primary-400 transition-colors">
                {c.name}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {c.period} • {c.region}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">{c.statusStr}</span>
                {c.playLinks && c.playLinks.length > 0 && (
                  <span className="text-xs text-gray-500 ml-2">
                    • {c.playLinks.length}集
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Video } from "@/types/video";

import { querySimilarVideos } from "@/actions/querySimilarVideos";
import { VideoCard } from "@/components/video/video-card";

export async function SimilarVideos({ video }: { video: Video }) {
  const data = await querySimilarVideos(video);

  console.log("SimilarVideos", data);

  if (!data?.length) return null;

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
          {data?.map((c) => (
            <VideoCard key={c.id} video={c} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

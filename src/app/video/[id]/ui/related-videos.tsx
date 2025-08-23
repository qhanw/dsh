import { queryRelatedVideos } from "@/actions/queryRelatedVideos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoCard } from "@/components/video/video-card";
import { Video } from "@/types/video";

export async function RelatedVideos({ video }: { video: Video }) {
  const data = await queryRelatedVideos(video);

  console.log("RelatedVideos", data);

  if (!data?.length) return null;

  return (
    <Card className="border-gray-100">
      <CardHeader>
        <CardTitle>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm mr-3">
            推荐
          </span>
          相关推荐
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.map((c) => (
          <VideoCard key={c.id} video={c} />
        ))}
      </CardContent>
    </Card>
  );
}

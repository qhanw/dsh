import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { VideoCard } from "@/components/video/video-card";
import { queryRecommend } from "@/actions/queryRecommend";
import { cn } from "@/lib/utils";

export async function RecommendVideos({ className }: { className: string }) {
  const data = await queryRecommend();
  return (
    <Card className={cn("border-gray-100", className)}>
      <CardHeader>
        <CardTitle>推荐视频</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
          {data?.map((c) => (
            <VideoCard key={c.id} video={c as any} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

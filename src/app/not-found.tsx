import { BackButton } from "@/components/back-button";
import { RecommendVideos } from "@/components/recommend-video";

export default function NotFound() {
  return (
    <main className="container mx-auto max-lg:p-4">
      <div className="flex justify-center items-center flex-col py-10 lg:py-20">
        <p className="text-gray-500 mb-8">
          抱歉，您访问的页面不存在。请返回首页继续浏览精彩影视内容。
        </p>

        <div className="space-x-4">
          <BackButton className="cursor-pointer" />
        </div>
      </div>

      <RecommendVideos className="mb-10" />
    </main>
  );
}

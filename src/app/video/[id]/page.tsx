import Link from "next/link";
import { getVideoDetailTDK } from "@/lib/tdk";

import { DetailsMobile } from "./ui/details-mobile";
import { DetailsMain } from "./ui/details-main";
import { NoVideo } from "./ui/no-video";

import { queryVideoDetails } from "@/actions/queryVideoDetails";

type DetailsProps = { params: Promise<{ id: string }> };

// 生成元数据
export async function generateMetadata({ params }: DetailsProps) {
  const match = await params;

  const video = await queryVideoDetails(match.id);

  if (video) return getVideoDetailTDK(video);

  return getVideoDetailTDK({ name: "视频详情" } as any);
}

export default async function Detail({ params }: DetailsProps) {
  const match = await params;

  const video = await queryVideoDetails(match.id);

  console.log("Loading video detail page for ID:", match.id, video);

  if (!video) return <NoVideo />;

  return (
    <main className="container mx-auto pb-12 max-lg:p-3 max-lg:pb-6">
      <nav className="text-sm text-gray-600 py-3 my-1 max-lg:mb-2">
        <Link href="/" title="首页" className="hover:text-primary-500">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{video.name}</span>
      </nav>

      <DetailsMobile video={video} />
      <DetailsMain video={video} />
    </main>
  );
}

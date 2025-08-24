import type { Metadata } from "next";
import { PAGINATION } from "@/cfg";
import { getHomeTDK } from "@/lib/tdk";

import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Pagination } from "@/components/pagination";
import { VideoGrid } from "@/components/video/video-grid";

import { queryHotVideos } from "@/actions/queryHotVideos";

export const metadata: Metadata = getHomeTDK();

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | number | undefined }>;

export default async function Home(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const sp = await props.searchParams;
  // 获取热门视频
  const data = await queryHotVideos(
    +(sp.page || PAGINATION.page),
    +(sp.pageSize || PAGINATION.pageSize)
  );
  console.log("home", data);

  return (
    <LayoutWrapper>
      <VideoGrid data={data.list || []} />
      <Pagination
        currentPage={data.page || PAGINATION.page}
        pageSize={data.pageSize || PAGINATION.pageSize}
        total={data.total || 0}
      />
    </LayoutWrapper>
  );
}

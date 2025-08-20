import type { Metadata } from "next";

import { getHomeTDK } from "@/lib/tdk";
import { queryVideosByTag } from "@/actions/queryVideosByTag";
import { VideoGrid } from "@/components/video/video-grid";
import { Pagination } from "@/components/pagination";

export const metadata: Metadata = getHomeTDK();

const PAGINATION = { page: 1, pageSize: 24 };

type Params = Promise<{ category: string }>;
type SearchParams = Promise<{ [key: string]: string | number | undefined }>;

export default async function Category(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const sp = await props.searchParams;
  const match = await props.params;
  // 获取热门视频
  const data = await queryVideosByTag(
    match.category,
    +(sp.page || PAGINATION.page),
    +(sp.pageSize || PAGINATION.pageSize)
  );
  console.log("category", data);

  return (
    <>
      <VideoGrid data={data.list || []} />
      <Pagination
        currentPage={data.page || PAGINATION.page}
        pageSize={data.pageSize || PAGINATION.pageSize}
        total={data.total || 0}
      />
    </>
  );
}

import type { Metadata } from "next";

import { getHomeTDK } from "@/lib/tdk";
import { queryByKeywords } from "@/actions/queryByKeywords";
import { VideoGrid } from "@/components/video/video-grid";
import { Pagination } from "@/components/pagination";

export const metadata: Metadata = getHomeTDK();

const PAGINATION = { page: 1, pageSize: 24 };

type Params = Promise<{ category: string }>;
type SearchParams = Promise<{ [key: string]: string | number | undefined }>;

export default async function Search(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const sp = await props.searchParams;
  const match = await props.params;
  // 获取热门视频
  const data = await queryByKeywords(
    +(sp.page || PAGINATION.page),
    +(sp.pageSize || PAGINATION.pageSize),
    sp.keywords?.toString() || ""
  );
  console.log("search", data);

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

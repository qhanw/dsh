import { PAGINATION } from "@/cfg";
import { getSearchTDK } from "@/lib/tdk";
import { queryByKeywords } from "@/actions/queryByKeywords";
import { VideoGrid } from "@/components/video/video-grid";
import { Pagination } from "@/components/pagination";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | number | undefined }>;
};

export async function generateMetadata(props: Props) {
  const keywords = (await props.searchParams).keywords;

  if (keywords) {
    return getSearchTDK(keywords.toString());
  }
}

export default async function Search(props: Props) {
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

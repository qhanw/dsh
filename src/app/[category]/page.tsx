import type { Metadata } from "next";

import { getCategoryTDK } from "@/lib/tdk";
import { queryVideosByTag } from "@/actions/queryVideosByTag";
import { VideoGrid } from "@/components/video/video-grid";
import { Pagination } from "@/components/pagination";
import { queryCategories } from "@/actions/queryCategories";
import { findPath } from "@/lib/utils";
import { tag } from "@/db";

// 生成元数据
export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}) {
  const match = await props.params;
  const tags = await queryCategories();

  if (tags?.length) {
    const breadcrumb = findPath(tags, match.category);

    if (breadcrumb) return getCategoryTDK(breadcrumb.map((c) => c.name));
  }

  return getCategoryTDK(["分类"]);
}

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

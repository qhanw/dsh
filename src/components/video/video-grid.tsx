import { VideoCard } from "./video-card";
// import { VideoListResponse, Video, VideoQueryParams } from "@/types/video";

type VideoGridProps = { data?: any[] };

// 修改组件定义
export const VideoGrid = ({ data }: VideoGridProps = {}) => {
  // if (isLoading && !data) {
  //   return <VideoGridSkeleton />;
  // }

  // if (isError) {
  //   return (
  //     <section className="px-4 lg:px-0">
  //       <div className="flex flex-col items-center justify-center py-12">
  //         <div className="text-red-400 text-6xl mb-4" aria-hidden="true">
  //           ❌
  //         </div>
  //         <h2 className="text-red-500 text-lg mb-2">加载失败</h2>
  //         <p className="text-gray-400 text-sm mb-4">
  //           {error?.message || "网络错误，请稍后重试"}
  //         </p>
  //         <button
  //           onClick={() => refetch()}
  //           className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
  //           aria-label="重新加载"
  //         >
  //           重新加载
  //         </button>
  //       </div>
  //     </section>
  //   );
  // }

  // 如果没有数据且不是加载状态，显示空状态
  if (!data?.length) {
    return (
      <section className="px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-6xl mb-4" aria-hidden="true">
            📺
          </div>
          <h2 className="text-gray-500 text-lg mb-2">暂无相关视频</h2>
          <p className="text-gray-400 text-sm">试试其他分类或搜索关键词</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-0">
      {/* 视频网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-8">
        {data?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* 加载状态 */}
      {/* {isLoading && (
        <div className="flex justify-center py-6">
          <div
            className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"
            aria-label="加载中"
          />
        </div>
      )} */}
    </section>
  );
};

// const VideoGridSkeleton = () => (
//   <section className="px-4 lg:px-0" aria-label="加载中">
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
//       {Array.from({ length: 12 }).map((_, i) => (
//         <article key={i} className="animate-pulse">
//           <div className="aspect-[2/3] bg-gray-200 rounded-lg" />
//           <div className="mt-2 space-y-2">
//             <div className="h-4 bg-gray-200 rounded" />
//             <div className="h-3 bg-gray-200 rounded w-2/3" />
//           </div>
//         </article>
//       ))}
//     </div>
//   </section>
// );

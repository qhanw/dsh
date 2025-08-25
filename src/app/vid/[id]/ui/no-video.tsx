import Link from "next/link";

export function NoVideo() {
  return (
    <div className="container mx-auto px-3 py-3 lg:py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">视频不存在</h1>
        <p className="text-gray-600 mb-6">该视频可能已被删除或不存在</p>
        <Link
          href="/"
          title="返回首页"
          className="inline-block bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

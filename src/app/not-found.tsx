import { BackButton } from "@/components/back-button";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            页面未找到
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            抱歉，您访问的页面不存在。请返回首页继续浏览精彩影视内容。
          </p>

          <div className="space-x-4">
            <BackButton className="cursor-pointer" />
          </div>
        </div>
      </div>
    </main>
  );
}

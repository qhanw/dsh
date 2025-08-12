"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto pt-28 pb-8">
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
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
              >
                返回首页
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                返回上页
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

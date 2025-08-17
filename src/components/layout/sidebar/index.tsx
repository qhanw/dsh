import { Suspense } from "react";

import Link from "next/link";
import { queryCategories } from "@/actions/queryCategories";

import { NavSide } from "./nav-side";

export async function Sidebar() {
  const list = await queryCategories();

  return (
    <Suspense fallback={<>loading</>}>
      <aside className="max-lg:hidden w-64">
        <nav className="bg-white rounded-lg shadow p-4" aria-label="分类导航">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">分类导航</h2>

          {/* 主分类 */}
          <NavSide categories={list} />

          {/* 推荐搜索 */}
          <section className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              推荐搜索
            </h3>
            <ul className="flex flex-wrap gap-1">
              {[
                "纳什维尔",
                "超能立方",
                "爱上海军蓝",
                "百变大咖秀2021",
                "转念花开",
                "不说话的爱",
              ].map((keyword, idx) => (
                <li key={idx}>
                  <Link
                    href={`/search?keywords=${encodeURIComponent(keyword)}`}
                    title={keyword}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {keyword}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>
      </aside>
    </Suspense>
  );
}

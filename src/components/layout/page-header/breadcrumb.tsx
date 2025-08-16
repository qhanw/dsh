"use client";

import { Category } from "../header/typing";
import { useSlug } from "../header/useSlug";
import { useParseUrl } from "./useParseUrl";

// const getBreadcrumb = () => {
//   if (urlKeywords) {
//     return ["首页", "搜索结果"];
//   }
//   if (isMainCategory && currentParentCategory) {
//     return ["首页", currentParentCategory.tag_name];
//   }
//   if (currentCategory && currentParentCategory) {
//     return ["首页", currentParentCategory.tag_name, currentCategory.tag_name];
//   }
//   return ["首页", "热门"];
// };

type BreadcrumbProps = { categories: Category[] };
export function Breadcrumb({ categories }: BreadcrumbProps) {
  const a = useParseUrl(categories);

  console.log(a);

  return (
    <header className="mb-6">
      <nav className="text-sm text-gray-600" aria-label="面包屑导航">
        <ol className="flex items-center">
          {/* {getBreadcrumb().map((item, index) => (
                <li key={index}>
                  {index > 0 && <span className="mx-2">/</span>}
                  {item}
                </li>
              ))} */}
        </ol>
      </nav>
    </header>
  );
}

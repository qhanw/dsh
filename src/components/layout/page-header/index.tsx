import { Title } from "./title";
import { Breadcrumb } from "./breadcrumb";

import { queryCategories } from "@/actions/queryCategories";

export async function PageHeader() {
  const list = await queryCategories();
  return (
    <header className="mb-6">
      <Title categories={list} />
      <Breadcrumb categories={list} />
    </header>
  );
}

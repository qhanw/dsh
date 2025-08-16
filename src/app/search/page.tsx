import { PageHeader } from "@/components/layout/page-header";
import { Sidebar } from "@/components/layout/sidebar";

export default function Search() {
  return (
    <main className="container mx-auto flex gap-6 py-8">
      <Sidebar />
      <section className="flex-1">
        <PageHeader />

        <div>123123</div>
        {/* <Suspense fallback={<div>加载中...</div>}>
            <VideoGrid />
          </Suspense> */}
      </section>
    </main>
  );
}

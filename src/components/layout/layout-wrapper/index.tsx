import { PageHeader } from "../page-header";
import { Sidebar } from "../sidebar";

export function LayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="container mx-auto flex gap-6 py-8">
      <Sidebar />
      <section className="flex-1 max-lg:p-4">
        <PageHeader />

        <div>{children}</div>
        {/* <Suspense fallback={<div>加载中...</div>}>
              <VideoGrid />
            </Suspense> */}
      </section>
    </main>
  );
}

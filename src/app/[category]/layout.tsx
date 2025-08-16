import type { Metadata } from "next";

import { Sidebar } from "@/components/layout/sidebar";

import { getHomeTDK } from "@/lib/tdk";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = getHomeTDK();

export default function CategoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="container mx-auto flex gap-6 py-8">
      <Sidebar />
      <section className="flex-1">
        <PageHeader />

        <div>{children}</div>
        {/* <Suspense fallback={<div>加载中...</div>}>
          <VideoGrid />
        </Suspense> */}
      </section>
    </main>
  );
}

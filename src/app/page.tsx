import type { Metadata } from "next";
import { getHomeTDK } from "@/lib/tdk";

import { LayoutWrapper } from "@/components/layout/layout-wrapper";

export const metadata: Metadata = getHomeTDK();

export default function Home() {
  return <LayoutWrapper>Home</LayoutWrapper>;
}

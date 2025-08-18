import type { Metadata } from "next";

import { getHomeTDK } from "@/lib/tdk";

export const metadata: Metadata = getHomeTDK();

export default function Search() {
  return <>Search</>;
}

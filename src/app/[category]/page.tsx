import type { Metadata } from "next";

import { getHomeTDK } from "@/lib/tdk";
export const metadata: Metadata = getHomeTDK();

export default function Category() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Category
    </div>
  );
}

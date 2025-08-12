import type { Metadata } from "next";
import Script from "next/script";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import { getHomeTDK } from "@/lib/tdk";

import { queryCategories } from "@/actions/queryCategories";

import "./globals.css";

export const metadata: Metadata = getHomeTDK();

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const list = await queryCategories();

  console.log(list);
  return (
    <html lang="zh-CN">
      <head>
        <Script
          id="cnzz-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _czc = _czc || [];
              (function () {
                var um = document.createElement("script");
                um.src = "https://s9.cnzz.com/z.js?id=1281427977&async=1";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(um, s);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
       
        {children}
        <Footer />
      </body>
    </html>
  );
}

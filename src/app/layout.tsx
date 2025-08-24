import Script from "next/script";

import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
                um.src = "https://v1.cnzz.com/z.js?id=1281430563&async=1";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(um, s);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

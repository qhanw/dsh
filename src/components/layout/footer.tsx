import Link from "next/link";
import { SITE_CONFIG } from "@/cfg";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          {/* 主要标语 */}
          <div className="text-lg font-semibold text-gray-200 max-w-3xl mx-auto">
            {SITE_CONFIG.description.replaceAll(",", "，")}
          </div>

          {/* 域名信息 */}
          <div className="text-sm text-gray-400">
            {SITE_CONFIG.shortName}易记域名：
            <Link href="/" title={SITE_CONFIG.shortName}>
              {SITE_CONFIG.domain}
            </Link>
          </div>

          {/* 版权声明 */}
          <div className="text-sm text-gray-400">
            {SITE_CONFIG.shortName}收录的节目无意侵犯了贵司版权请联系此邮箱下架
          </div>

          {/* 蜘蛛地图和robots.txt入口 */}
          <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
            <a
              href="/rss/baidu.xml"
              className="hover:text-gray-300 transition-colors mr-4"
            >
              百度蜘蛛地图
            </a>
          </div>

          {/* 版权信息 */}
          <div className="text-sm text-gray-500">
            Copyright © 2025 {SITE_CONFIG.shortName} All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

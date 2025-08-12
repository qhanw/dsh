export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          {/* 主要标语 */}
          <div className="text-lg font-semibold text-gray-200">
            乡村蓝光影院，全站高清无广告，免费免VIP在线观看，只为极致观影体验，看电影就找乡村电影！
          </div>
          
          {/* 域名信息 */}
          <div className="text-sm text-gray-400">
            乡村电影网易记域名：xc01.cc
          </div>
          
          {/* 版权声明 */}
          <div className="text-sm text-gray-400">
            乡村影视收录的节目无意侵犯了贵司版权请联系此邮箱下架
          </div>
          
          {/* 蜘蛛地图和robots.txt入口 */}
          <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
            <a href="/rss/baidu.xml" className="hover:text-gray-300 transition-colors mr-4">
              百度蜘蛛地图
            </a>
          </div>
          
          {/* 版权信息 */}
          <div className="text-sm text-gray-500">
            © 2025 xc01.cc 乡村电影网 All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 
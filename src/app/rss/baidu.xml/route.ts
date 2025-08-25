import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/cfg";
import { queryVideos } from "@/actions/queryVideos";

export async function GET() {
  try {
    // 获取最新的视频数据
    const videos = await queryVideos();

    const baseUrl = SITE_CONFIG.domain;

    // 生成XML内容
    let xmlContent =
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // 添加视频链接
    videos.forEach((c) => {
      const videoUrl = `${baseUrl}/vid/${c.id}`; // 去除.html后缀
      const lastModified = new Date().toISOString().split("T")[0]; // 使用当前日期
      xmlContent += `  <url>\n    <loc>${videoUrl}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>always</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    });

    xmlContent += "</urlset>";

    // 设置响应头
    const headers = {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // 缓存1小时
    };

    return new NextResponse(xmlContent, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("RSS generation error:", error);

    // 返回错误响应
    return new NextResponse("Error generating RSS feed", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}

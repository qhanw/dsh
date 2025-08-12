import { Metadata } from 'next';

// 网站基础信息
export const SITE_INFO = {
  name: '乡村电影网',
  description: '乡村电影网每日更新最新最热的电影、电视剧、综艺、动漫等影视信息，欢迎访问，有你更精彩！',
  keywords: '乡村电影,乡村影视,手机看短剧',
  domain: 'https://www.xc01.cc', // 请替换为实际域名
  brand: '乡村电影网', // 品牌名称
};

// 动态title生成器 - 参考图片中的格式
export const generateDynamicTitle = (video: any, type: 'detail' | 'play' | 'list' = 'detail'): string => {
  const { name, period, region, language, status_str, playLinks } = video;
  
  // 基础信息
  const videoName = name || '未知影片';
  const year = period || '';
  const country = region || '';
  const lang = language || '';
  const status = status_str || '';
  const episodeCount = playLinks?.length || 0;
  
  // 画质信息
  const quality = 'HD中字';
  const route = '线路F';
  const features = '高清免VIP无广告';
  
  // 根据不同类型生成不同的title
  switch (type) {
    case 'detail':
      // 详情页格式：《电影名称》HD中字_线路F高清免VIP无广告_乡村电影网
      return `《${videoName}》${quality}_${route}${features}_${SITE_INFO.brand}`;
    
    case 'play':
      // 播放页格式：《电影名称》第X集_线路F免费播放全集_乡村电影网
      const episodeText = episodeCount > 1 ? `第1集` : '';
      return `《${videoName}》${episodeText}_${route}免费播放全集_${SITE_INFO.brand}`;
    
    case 'list':
      // 列表页格式：《电影名称》HD中字_线路F在线观看免费_乡村电影网
      return `《${videoName}》${quality}_${route}在线观看免费_${SITE_INFO.brand}`;
    
    default:
      return `《${videoName}》${quality}_${route}${features}_${SITE_INFO.brand}`;
  }
};

// 生成SEO优化的title
export const generateSEOTitle = (video: any, type: 'detail' | 'play' | 'list' = 'detail'): string => {
  const dynamicTitle = generateDynamicTitle(video, type);
  
  // 添加年份和地区信息
  const { period, region } = video;
  const year = period ? `${period}年` : '';
  const country = region || '';
  
  let seoTitle = dynamicTitle;
  
  if (year || country) {
    seoTitle += `_${year}${country}`;
  }
  
  return seoTitle;
};

// 生成完整的动态title（包含网站名称）
export const generateFullTitle = (video: any, type: 'detail' | 'play' | 'list' = 'detail'): string => {
  const seoTitle = generateSEOTitle(video, type);
  return `${seoTitle} - ${SITE_INFO.name}`;
};

// 首页TDK
export const getHomeTDK = (): Metadata => ({
  title: SITE_INFO.name,
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  openGraph: {
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_INFO.name,
    description: SITE_INFO.description,
  },
});

// 分类列表页TDK
export const getCategoryTDK = (categoryName: string, parentCategoryName?: string): Metadata => {
  const title = parentCategoryName 
    ? `${categoryName} - ${parentCategoryName} - ${SITE_INFO.name}`
    : `${categoryName} - ${SITE_INFO.name}`;
  
  const description = `${categoryName}相关影视资源，${SITE_INFO.description}`;
  const keywords = `${categoryName},${parentCategoryName || ''},${SITE_INFO.keywords}`;
  
  return {
    title: title as string,
    description: description as string,
    keywords: keywords as string,
    openGraph: {
      title: title as string,
      description: description as string,
      type: 'website',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: title as string,
      description: description as string,
    },
  };
};

// 搜索页TDK
export const getSearchTDK = (keywords: string): Metadata => {
  const title = `搜索: ${keywords} - ${SITE_INFO.name}`;
  const description = `搜索"${keywords}"相关影视资源，${SITE_INFO.description}`;
  const searchKeywords = `${keywords},搜索,${SITE_INFO.keywords}`;
  
  return {
    title: title as string,
    description: description as string,
    keywords: searchKeywords as string,
    openGraph: {
      title: title as string,
      description: description as string,
      type: 'website',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: title as string,
      description: description as string,
    },
  };
};

// 视频详情页TDK - 使用动态title
export const getVideoDetailTDK = (video: any): Metadata => {
  const title = generateFullTitle(video, 'detail');
  const description = `${video.name}高清在线观看，${SITE_INFO.description}`;
  const keywords = `${video.name},高清,在线观看,${SITE_INFO.keywords}`;
  
  return {
    title: title as string,
    description: description as string,
    keywords: keywords as string,
    openGraph: {
      title: title as string,
      description: description as string,
      type: 'video.movie',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: title as string,
      description: description as string,
    },
  };
};

// 播放页TDK - 使用动态title
export const getPlayPageTDK = (video: any, episode?: string): Metadata => {
  const title = generateFullTitle(video, 'play');
  const description = `${video.name}在线播放，高清流畅，${SITE_INFO.description}`;
  const keywords = `${video.name},在线播放,${SITE_INFO.keywords}`;
  
  return {
    title: title as string,
    description: description as string,
    keywords: keywords as string,
    openGraph: {
      title: title as string,
      description: description as string,
      type: 'video.episode',
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: title as string,
      description: description as string,
    },
  };
};

// 404页面TDK
export const get404TDK = (): Metadata => ({
  title: `页面未找到 - ${SITE_INFO.name}`,
  description: '抱歉，您访问的页面不存在。请返回首页继续浏览精彩影视内容。',
  keywords: '404,页面未找到,影视网站',
  robots: 'noindex, nofollow',
});

// 生成面包屑数据
export const generateBreadcrumbs = (path: string, categoryName?: string, videoName?: string) => {
  const breadcrumbs = [
    { name: '首页', url: '/' }
  ];
  
  if (path.startsWith('/category/')) {
    breadcrumbs.push({ name: categoryName || '分类', url: path });
  } else if (path.startsWith('/video/')) {
    breadcrumbs.push({ name: '视频详情', url: '#' });
    if (videoName) {
      breadcrumbs.push({ name: videoName, url: '#' });
    }
  } else if (path.startsWith('/play/')) {
    breadcrumbs.push({ name: '在线播放', url: '#' });
    if (videoName) {
      breadcrumbs.push({ name: videoName, url: '#' });
    }
  }
  
  return breadcrumbs;
}; 
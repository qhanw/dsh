export const SITE_CONFIG = {
  name: '乡村电影网',
  shortName: '乡村电影',
  description: '免费高清影视资源在线观看',
  logo: {
    text: '乡村电影网',
    image: '/logo.png'
  },
  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      }
    }
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://www.xc01.cc',
    endpoints: {
      tag: '/api/tag/0',
      video: '/api/video',
      videoDetail: (id: string) => `/api/video/${id}`
    }
  },
  nav: {
    mobile: [
      { id: 'home', name: '首页', path: '/' },
      { id: 'movie', name: '影片', path: '/category/1' },
      { id: 'tv', name: '连续剧', path: '/category/2' },
      { id: 'preview', name: '综艺片', path: '/category/3' },
      { id: 'menu', name: '更多', path: null }
    ]
  }
}; 
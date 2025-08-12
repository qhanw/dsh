type Environment = 'development' | 'production' | 'staging';
const ENV = (process.env.NODE_ENV || 'development') as Environment;

// 环境变量配置
const ENV_CONFIG = {
  // API配置 - 优先使用 NEXT_PUBLIC_ 前缀的环境变量（客户端可用）
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'https://www.xc01.cc',
  API_HOST: process.env.NEXT_PUBLIC_API_HOST || process.env.API_HOST || 'www.xc01.cc',
  API_PORT: process.env.NEXT_PUBLIC_API_PORT || process.env.API_PORT || '443',
  API_PROTOCOL: process.env.NEXT_PUBLIC_API_PROTOCOL || process.env.API_PROTOCOL || 'https',
  
  // 网站配置
  SITE_NAME: process.env.SITE_NAME || '乡村电影网',
  SITE_SHORT_NAME: process.env.SITE_SHORT_NAME || '乡村电影',
  SITE_DESCRIPTION: process.env.SITE_DESCRIPTION || '免费高清影视资源在线观看',
  
  // 其他配置
  NODE_ENV: ENV,
  IS_DEV: ENV === 'development',
  IS_PROD: ENV === 'production',
  IS_STAGING: ENV === 'staging',
} as const;

// 添加调试信息
if (typeof window !== 'undefined') {
  console.log('🔍 客户端环境变量调试信息:');
  console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
  console.log('API_BASE_URL:', process.env.API_BASE_URL);
  console.log('最终 API_BASE_URL:', ENV_CONFIG.API_BASE_URL);
}

// 环境特定配置
const ENVIRONMENT_CONFIG = {
  development: {
    // 开发环境特定配置
    DEBUG: true,
    LOG_LEVEL: 'debug',
  },
  staging: {
    // 预发布环境特定配置
    DEBUG: false,
    LOG_LEVEL: 'info',
  },
  production: {
    // 生产环境特定配置
    DEBUG: false,
    LOG_LEVEL: 'error',
  },
} as const;

// 网站基础配置
export const SITE_CONFIG = {
  name: ENV_CONFIG.SITE_NAME,
  shortName: ENV_CONFIG.SITE_SHORT_NAME,
  description: ENV_CONFIG.SITE_DESCRIPTION,
  logo: {
    text: ENV_CONFIG.SITE_NAME,
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
  nav: {
    mobile: [
      { id: 'home', name: '首页', path: '/' },
      { id: 'movie', name: '影片', path: '/category/1' },
      { id: 'tv', name: '连续剧', path: '/category/2' },
      { id: 'preview', name: '综艺片', path: '/category/3' },
      { id: 'menu', name: '更多', path: null }
    ]
  }
} as const;

// API配置
export const API_CONFIG = {
  BASE_URL: ENV_CONFIG.API_BASE_URL,
  HOST: ENV_CONFIG.API_HOST,
  PORT: ENV_CONFIG.API_PORT,
  PROTOCOL: ENV_CONFIG.API_PROTOCOL,
  
  IMAGE: {
    protocol: ENV_CONFIG.API_PROTOCOL,
    hostname: ENV_CONFIG.API_HOST,
    port: ENV_CONFIG.API_PORT,
    pathname: '/api/file',  // 更新为正确的路径
  },
  
  // API端点配置
  ENDPOINTS: {
    TAG: '/api/tag/0',
    VIDEO: '/api/video',
    VIDEO_DETAIL: (id: string) => `/api/video/${id}`,
    HOME_HOT: '/api/',
  },
  
  // 请求配置
  REQUEST: {
    timeout: 10000,
    retries: 3,
    retryDelay: 1000,
  }
} as const;

// 应用配置
export const APP_CONFIG = {
  ...ENVIRONMENT_CONFIG[ENV],
  env: ENV,
  isDev: ENV_CONFIG.IS_DEV,
  isProd: ENV_CONFIG.IS_PROD,
  isStaging: ENV_CONFIG.IS_STAGING,
  
  // 性能配置
  performance: {
    enableCache: ENV_CONFIG.IS_PROD,
    cacheTTL: 300, // 5分钟
    enableCompression: ENV_CONFIG.IS_PROD,
  },
  
  // 安全配置
  security: {
    enableCSP: ENV_CONFIG.IS_PROD,
    enableHSTS: ENV_CONFIG.IS_PROD,
  }
} as const;

// 构建完整的API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// 获取图片URL
export const getImageUrl = (path: string) => {
  const { protocol, hostname, port, pathname } = API_CONFIG.IMAGE;
  return `${protocol}://${hostname}:${port}${pathname}${path}`;
};

// 导出环境变量配置（用于调试）
export const ENV_VARS = ENV_CONFIG;

// 配置验证
export const validateConfig = () => {
  const required = ['API_BASE_URL', 'SITE_NAME'];
  const missing = required.filter(key => !ENV_CONFIG[key as keyof typeof ENV_CONFIG]);
  
  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
}; 
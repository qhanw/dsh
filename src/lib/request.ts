import { handleApiError } from './error';
import { getApiUrl } from './config';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  retries?: number;
  retryDelay?: number;
}

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, retries = 2, retryDelay = 1000, ...init } = options;

  // 处理查询参数
  const url = new URL(getApiUrl(endpoint));
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(
          key,
          typeof value === 'object' ? JSON.stringify(value) : String(value)
        );
      }
    });
  }

  console.log('Making API request to:', url.toString());

  // 设置默认headers
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && !init.body) {
    headers.set('Content-Type', 'application/json');
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url.toString(), {
        ...init,
        headers,
        signal: AbortSignal.timeout(15000), // 增加到15秒超时
      });

      console.log(`API response status (attempt ${attempt + 1}):`, response.status);

      // 错误处理
      await handleApiError(response);

      // 解析响应
      const data = await response.json();
      console.log('API response data:', data);
      return data;
    } catch (error) {
      lastError = error as Error;
      console.error(`API request failed (attempt ${attempt + 1}):`, error);
      
      // 如果是最后一次尝试，抛出错误
      if (attempt === retries) {
        throw error;
      }
      
      // 等待后重试
      console.log(`Retrying in ${retryDelay}ms...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  // 这行代码理论上不会执行，但为了类型安全
  throw lastError || new Error('Request failed after all retries');
} 
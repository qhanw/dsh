export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    let errorData;
    
    try {
      errorData = await response.json();
    } catch (parseError) {
      console.warn('Failed to parse error response:', parseError);
      errorData = {
        message: 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR'
      };
    }

    const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
    const errorCode = errorData.code || `HTTP_${response.status}`;
    
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      message: errorMessage,
      code: errorCode
    });

    throw new ApiError(
      response.status,
      errorMessage,
      errorCode
    );
  }
  return response;
}; 
type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const typedFetch = async <T, K = unknown>(
  url: string,
  method?: RequestMethods,
  body?: K,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, {
    method: method || 'GET',
    body: JSON.stringify(body),
    headers: options?.headers || {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

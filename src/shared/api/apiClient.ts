export const typedFetch = async <T, K = unknown>(
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: K,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, {
    method: method || 'GET',
    body: JSON.stringify(body),
    headers: options?.headers || {
      'Content-Type': 'application/json',
      // Authorization: `Bearer holymoly...`,
    },
    ...options,
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    } else {
      throw new Error('Unauthorized');
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

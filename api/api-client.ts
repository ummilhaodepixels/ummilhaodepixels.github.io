async function fetchWithToken(url: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...(!(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : undefined),
      ...options?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP status: ${response.status}`);
  }

  return response;
}

const client = {
  get: (url: string, options: RequestInit = {}) => fetchWithToken(url, options),
  post: (url: string, options: RequestInit = {}) =>
    fetchWithToken(url, { ...options, method: "POST" }),
  put: (url: string, options: RequestInit = {}) =>
    fetchWithToken(url, { ...options, method: "PUT" }),
  delete: (url: string, options: RequestInit = {}) =>
    fetchWithToken(url, { ...options, method: "DELETE" }),
};

export default client;

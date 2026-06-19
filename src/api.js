const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function api(path, options = {}, token = localStorage.getItem("axis_token")) {
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (options.body && !(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) throw new Error(payload.detail || payload || "Request failed");
  return payload;
}

export { API_URL };

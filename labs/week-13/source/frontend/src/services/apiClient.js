const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.PROD ? '' : 'http://localhost:3001');
const TOKEN_KEY = 'engse203-lab13-token';
export function getAuthToken() { return typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem(TOKEN_KEY); }
export function setAuthToken(token) {
  if (typeof sessionStorage !== 'undefined') {
    if (token) sessionStorage.setItem(TOKEN_KEY, token); else sessionStorage.removeItem(TOKEN_KEY);
  }
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('lab13-auth-change'));
}
export class ApiError extends Error {
  constructor(message, status) { super(message); this.name = 'ApiError'; this.status = status; }
}
export async function apiFetch(path, options = {}) {
  let response;
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const token = getAuthToken();
  if (token) headers.set('Authorization', 'Bearer ' + token);
  try { response = await fetch(BASE_URL + path, { ...options, headers }); }
  catch { throw new ApiError('ติดต่อเซิร์ฟเวอร์ไม่ได้ — ตรวจว่าเปิด API แล้ว', 0); }
  if (!response.ok) {
    if (response.status === 401) setAuthToken(null);
    let message = 'คำขอไม่สำเร็จ (' + response.status + ')';
    try { const data = await response.json(); message = data.error ?? message; } catch {}
    throw new ApiError(message, response.status);
  }
  return response.status === 204 ? null : response.json();
}

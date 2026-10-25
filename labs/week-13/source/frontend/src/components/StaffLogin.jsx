import { useState, useEffect } from 'react';
import { apiFetch, getAuthToken, setAuthToken } from '../services/apiClient.js';
export default function StaffLogin() {
  const [signedIn, setSignedIn] = useState(Boolean(getAuthToken()));
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  useEffect(() => { const update = () => setSignedIn(Boolean(getAuthToken())); window.addEventListener('lab13-auth-change', update); return () => window.removeEventListener('lab13-auth-change', update); }, []);
  async function login(event) {
    event.preventDefault(); setBusy(true); setError('');
    try { const result = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); setAuthToken(result.token); setPassword(''); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  return <section className="panel" aria-label="เข้าสู่ระบบเจ้าหน้าที่">
    {signedIn ? <><p role="status">เข้าสู่ระบบเจ้าหน้าที่แล้ว</p><button className="button" type="button" onClick={() => setAuthToken(null)}>ออกจากระบบ</button></> :
    <form onSubmit={login}><h2>เข้าสู่ระบบเจ้าหน้าที่</h2><p>ผู้แจ้งดูและส่งคำร้องได้โดยไม่ต้องเข้าสู่ระบบ</p>
      <label htmlFor="staff-email">อีเมลเจ้าหน้าที่</label><input id="staff-email" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} />
      <label htmlFor="staff-password">รหัสผ่าน</label><input id="staff-password" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="button primary" disabled={busy} type="submit">{busy ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}</button>
      {error && <p role="alert">{error}</p>}
    </form>}
  </section>;
}

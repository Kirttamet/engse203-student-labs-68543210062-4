import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';
const router = Router();
const failures = new Map();
const WINDOW_MS = 15 * 60 * 1000;
export function resetLoginLimiter() { failures.clear(); }
router.post('/login', (req, res) => {
  const now = Date.now();
  for (const [key, value] of failures) if (value.expiresAt <= now) failures.delete(key);
  const key = req.ip;
  const entry = failures.get(key);
  if (entry?.count >= 5 || (!entry && failures.size >= 1000)) {
    res.set('Retry-After', String(Math.ceil(((entry?.expiresAt ?? now + WINDOW_MS) - now) / 1000)));
    return res.status(429).json({ error: 'ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 15 นาที' });
  }
  const errors = validateLoginInput(req.body);
  if (errors.length) return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    failures.set(key, { count: (entry?.count ?? 0) + 1, expiresAt: entry?.expiresAt ?? now + WINDOW_MS });
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  failures.delete(key);
  return res.status(200).json(result);
});
export default router;

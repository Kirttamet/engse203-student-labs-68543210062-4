import { verifyToken } from '../services/authService.js';
export function authenticate(req, res, next) {
  const match = /^Bearer ([^ ]+)$/i.exec(req.get('Authorization') ?? '');
  if (!match) return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' });
  try { req.user = verifyToken(match[1]); } catch { return res.status(401).json({ error: 'Token ไม่ถูกต้องหรือหมดอายุ' }); }
  next();
}
export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) return res.status(403).json({ error: 'ไม่มีสิทธิ์ทำรายการนี้' });
    next();
  };
}

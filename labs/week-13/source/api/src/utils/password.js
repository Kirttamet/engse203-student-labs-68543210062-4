import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}
export function verifyPassword(password, stored) {
  if (typeof password !== 'string' || typeof stored !== 'string') return false;
  const [scheme, salt, hash, extra] = stored.split('$');
  if (scheme !== 'scrypt' || !/^[a-f0-9]{32}$/i.test(salt ?? '') || !/^[a-f0-9]{128}$/i.test(hash ?? '') || extra !== undefined) return false;
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(hash, 'hex'));
}

import { resetLoginLimiter } from '../../src/routes/authRoutes.js';
import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { loadSeed } from '../../src/services/requestService.js';
import { STAFF, loginAsStaff, tokenFor } from '../helpers/auth.js';

/**
 * Week 13 — เข้าสู่ระบบและสิทธิ์
 * test 3 ข้อแรกให้มาแล้ว — จะ fail จนกว่าจะทำ CP50–CP51 เสร็จ (เขียน test ก่อน แล้วทำให้ผ่าน)
 */
const app = createApp();
beforeEach(async () => { resetLoginLimiter(); await loadSeed(); });

describe('POST /api/auth/login', () => {
  test('อีเมลและรหัสผ่านถูก → 200 พร้อม token', async () => {
    const r = await request(app).post('/api/auth/login').send(STAFF);
    expect(r.status).toBe(200);
    expect(r.body.token.split('.')).toHaveLength(3);
  });
  test('รหัสผ่านผิด → 401', async () => {
    const r = await request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' });
    expect(r.status).toBe(401);
  });

  // 🏫 TODO W13-LOGIN (CP50): อีเมลที่ไม่มี ต้องได้ข้อความ error เดียวกับรหัสผ่านผิด
});

describe('สิทธิ์ของ PUT / DELETE', () => {
  test('ไม่มี token → 401', async () => {
    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'completed' });
    expect(r.status).toBe(401);
  });

  // 🏫 TODO W13-AUTH (CP51): เพิ่ม
  //   - token ที่ไม่ใช่เจ้าหน้าที่ → 403      ใช้ tokenFor('requester')
  //   - token ปลอม (secret อื่น) → 401        ใช้ tokenFor('staff', 'not-the-real-secret')
  //   - เจ้าหน้าที่ → PUT 200 และ DELETE 204  ใช้ await loginAsStaff(app)
  //   ⚠ หลังผูก authenticate แล้ว test ของ PUT/DELETE ใน requests.api.test.js จะพัง (401)
  //     — นั่นคือสัญญาณว่า requirement เปลี่ยน: แก้ test ให้เข้าสู่ระบบก่อน
});

test('unknown email and wrong password have identical responses', async()=>{
 const a=await request(app).post('/api/auth/login').send({...STAFF,password:'incorrect'});
 const b=await request(app).post('/api/auth/login').send({...STAFF,email:'absent@example.com'});
 expect(a.status).toBe(401); expect(b.status).toBe(401); expect(b.body).toEqual(a.body);
});
test.each([['requester',undefined,403],['staff','not-the-real-secret',401]])('role %s / secret %s',async(role,secret,status)=>{
 const r=await request(app).put('/api/requests/REQ-001').set('Authorization', 'Bearer '+tokenFor(role,secret)).send({status:'completed'});
 expect(r.status).toBe(status);
});
test('staff can update and delete',async()=>{
 const header={Authorization:'Bearer '+await loginAsStaff(app)};
 await request(app).put('/api/requests/REQ-001').set(header).send({status:'completed'}).expect(200);
 await request(app).delete('/api/requests/REQ-001').set(header).expect(204);
});
test('JSON size over 10kb rejected',async()=>{
 await request(app).post('/api/requests').send({details:'x'.repeat(11000)}).expect(413);
});

test('five failed logins block even correct credentials on attempt six', async()=>{
 for(let i=0;i<5;i++) await request(app).post('/api/auth/login').send({...STAFF,password:'wrong'}).expect(401);
 const blocked=await request(app).post('/api/auth/login').send(STAFF);
 expect(blocked.status).toBe(429); expect(Number(blocked.headers['retry-after'])).toBeGreaterThan(0);
});
test('security headers are present', async()=>{
 const r=await request(app).get('/api/health');
 expect(r.headers['x-content-type-options']).toBe('nosniff');
 expect(r.headers['x-frame-options']).toBe('DENY');
 expect(r.headers['referrer-policy']).toBe('no-referrer');
});
test('expired token receives 401', async()=>{
 const jwt=await import('jsonwebtoken'); const {config}=await import('../../src/config.js');
 const token=jwt.default.sign({sub:'1',role:'staff'},config.jwtSecret,{expiresIn:-1});
 await request(app).delete('/api/requests/REQ-001').set('Authorization','Bearer '+token).expect(401);
});

# LAB13 — Campus Service Security

สถาปัตยกรรม React → Express API → SQLite. เริ่มจาก starter Week13 ของอาจารย์ที่แก้ 4 bugs ของ Week12 แล้ว เพิ่ม validation, scrypt, JWT และสิทธิ์ staff ตาม CP48–52

## ติดตั้งและรัน

ใช้ Node >=22.13 (ทดสอบ Node 24). รันจาก source/:

```bash
npm ci --prefix api
npm ci --prefix frontend
npm run db:setup --prefix api
cp api/.env.example api/.env
npm run dev --prefix api
# อีก terminal
npm run dev --prefix frontend
```

Vite อยู่ localhost:5173, API อยู่ localhost:3001. บัญชี seed สำหรับทดสอบใน LAB เท่านั้น: staff@rmutl.ac.th / staff1234. ผู้แจ้งดูและสร้างคำร้องได้โดยไม่ login. เจ้าหน้าที่ login ผ่านแบบฟอร์มจึงลบหรือเปลี่ยนสถานะผ่าน API ได้

## ทดสอบ

```bash
npm test --prefix api
npm test --prefix frontend
npm run coverage --prefix api
npm run build --prefix frontend
node --disable-warning=ExperimentalWarning check-week13.mjs --inclass
node --disable-warning=ExperimentalWarning check-week13.mjs
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass
```

SQLite :memory: ใช้แยกแต่ละ test ไม่แก้ campus.db ที่ต้องส่ง. tests PUT/DELETE เข้าสู่ระบบก่อนตาม requirement ใหม่. คง regression tests ของ Week12. ผล starter ก่อนแก้และผลหลังแก้อยู่ ../evidence/

## กฎความปลอดภัย

- ข้อมูลชื่อ/สถานที่/รายละเอียดต้องเป็น string มีขั้นต่ำและสูงสุด 100/100/1000 ตัวอักษร. JSON body จำกัด 10kb
- รหัสผ่านเก็บ scrypt hash พร้อม salt สุ่ม 16 bytes และเปรียบเทียบ timingSafeEqual
- Login คืน JWT อายุ 2 ชั่วโมงพร้อม sub/name/role ไม่ส่ง passwordHash. ตรวจ signature และจำกัด algorithm HS256
- PUT/DELETE: ไม่มี token, token ปลอม หรือหมดอายุ → 401; token ที่ไม่ใช่ staff → 403. GET/POST ยังเป็น public
- production ไม่มี JWT_SECRET → ไม่ยอม start. error ไม่ส่ง stack trace ใน production
- Login ผิด 5 ครั้งต่อ IP ใน 15 นาที → ครั้งถัดไป 429 พร้อม Retry-After. limiter เก็บใน process memory เหมาะกับ LAB instance เดียว; หลาย instance ต้องใช้ shared store
- Frontend เก็บ token ใน sessionStorage, ส่ง Bearer จาก apiClient และล้างเมื่อ 401. logout ล้าง token เฉพาะ tab; JWT ที่ออกไปยังมีอายุจนหมดอายุ
- response มี nosniff, DENY และ no-referrer

## Production / Render / Pages

Build frontend ก่อน แล้วตั้ง NODE_ENV=production และ JWT_SECRET แบบสุ่มนอก repository จึงรัน npm start. Express เสิร์ฟ frontend/dist กับ /api บน origin เดียวกัน. VITE_API_BASE_URL override ได้; production ใช้ path สัมพัทธ์โดยไม่ต้องมี .env.production ซึ่งตัว verify ของ repo ห้ามไว้

render.yaml มี Root Directory labs/week-13/source, healthCheckPath /api/health และ JWT_SECRET generateValue: true. หากตั้ง Render ผ่านหน้าเว็บ ต้องตั้ง Environment ให้ครบด้วยตนเอง. ยังไม่ได้สร้าง service จริง. SQLite บน disk ชั่วคราวอาจหายเมื่อ redeploy; ระบบใช้งานจริงต้องใช้ persistent disk หรือ database ภายนอกและสร้างบัญชี staff ของตัวเองผ่าน npm run create-staff --prefix api -- <email> <password> <name>

GitHub Pages เป็นเพียงรายงาน static ใน publish/ ไม่รัน Express/SQLite. สร้าง Hub จาก root ด้วย npm run build:pages -- --week week-13. ยังไม่สร้าง PR หรือ tag; ต้องใช้ URL PR จริงหลังคุณเปิด PR แล้ว

## References & AI Assistance

Source: engse203-lab/labs/week-13-quality-security/lab13/starter และคู่มืออาจารย์. OpenAI Codex ช่วย implement, เขียนและรัน tests, วิเคราะห์ผล และจัดเอกสาร. ไม่ใช้ solution นักศึกษาคนอื่น. นักศึกษาต้องอ่านและอธิบายโค้ดด้วยตนเอง ไม่อ้างว่า deploy หรือบันทึกวิดีโอแล้ว

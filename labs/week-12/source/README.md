# LAB12 — Testing and Debugging

Campus Service Request เป็น React frontend → Express API → SQLite. งานนี้เริ่มจาก starter Week12 ของอาจารย์ ไม่เปลี่ยน source ของ LAB ก่อนหน้า

## ติดตั้งและรัน

Node >=22.13 (ทดสอบบน Node 24). จาก source/:

```bash
npm ci --prefix api
npm ci --prefix frontend
npm run db:setup --prefix api
cp api/.env.example api/.env
npm run dev --prefix api
# อีก terminal
npm run dev --prefix frontend
```

API พอร์ต 3001, frontend พอร์ต 5173. api/.env เป็นไฟล์เฉพาะเครื่อง ห้ามนำขึ้น Git. campus.db ต้องเริ่มจากข้อมูล seed 5 คำร้องตามโจทย์

## ทดสอบ

```bash
npm test --prefix api
npm test --prefix frontend
npm run coverage --prefix api
npm run build --prefix frontend
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass
node --disable-warning=ExperimentalWarning check-week12.mjs
```

Unit tests ครอบคลุมชนิดข้อมูล ค่า enum และค่าขอบ. Integration tests ยิงผ่าน route/controller/service ไป SQLite จริง โดย vitest.config.js ตั้ง DB_FILE=:memory: และ loadSeed ใหม่ทุก test. Regression tests เก็บ 4 bug ตาม DEBUG_LOG.md. ผลก่อนและหลังแก้อยู่ ../evidence/. ไม่ใช้ campus.db ของ LAB อื่น

## Pages และการส่งงาน

source/ เก็บโค้ด; evidence/ เก็บผลจริง; publish/ เป็นรายงาน static สำหรับ GitHub Pages. Express/SQLite ไม่สามารถรันบน GitHub Pages ได้ จึงต้องใช้ npm run dev หรือ Node host เพื่อใช้งาน full-stack. ยังไม่ deploy URL จริงหรือสร้าง PR/tag

การ build Pages ใน main รุ่นปัจจุบันยังติด Week11 ที่ไม่มี metadata. ต้อง merge branch fix/week-10-v2 ที่ซ่อม builder ก่อน จึงใช้ npm run build:pages -- --week week-12 ได้. ไม่แก้ metadata ของ Week11 เพื่อหลบ error

## References & AI Assistance

อ้างอิง engse203-lab/labs/week-12-testing-debugging/lab12/starter และคู่มืออาจารย์. OpenAI Codex ช่วยออกแบบกรณีทดสอบ วิเคราะห์ stack trace แก้ 4 bug และตรวจผล. นักศึกษาต้องอ่านโค้ดและเขียน reflection จากความเข้าใจจริง ยังไม่อ้างว่าได้เปิด breakpoint, บันทึกวิดีโอ หรือส่งงานแล้ว

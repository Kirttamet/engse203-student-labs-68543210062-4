# LAB 10 — Campus Service Request

สถาปัตยกรรม 3 ชั้น: React frontend ส่ง HTTP ไปยัง Express API; controller ตรวจและเลือก status code; service อ่านเขียน SQLite database ผ่าน prepared statements. users เชื่อม requests ด้วย foreign key. API ใช้ JOIN แปลง requester_id เป็น requesterName ให้ frontend เดิมใช้งานได้

## ติดตั้งและรัน

ใช้ Node >=22.13 และทำคำสั่งจากโฟลเดอร์ source ของ LAB นี้

```bash
npm install --prefix api
npm install --prefix frontend
npm run db:setup --prefix api
cp api/.env.example api/.env
npm run dev --prefix api
# เปิด terminal อีกหน้าต่าง
npm run dev --prefix frontend
```

API อยู่ localhost:3001 และ Vite อยู่ localhost:5173. GET /api/requests อ่านข้อมูล, POST สร้างคำร้อง, PUT /api/requests/:id เปลี่ยนสถานะ, DELETE ลบคำร้อง. GET /api/health ตรวจฐานข้อมูล

## ตรวจงานและ build

```bash
node --disable-warning=ExperimentalWarning check-week10.mjs
npm test --prefix api
npm run build --prefix frontend
```



## Production และ GitHub Pages

Build frontend ก่อน แล้วตั้ง NODE_ENV=production และรัน npm start. Express เสิร์ฟ frontend/dist และ /api บน origin เดียวกัน โดย frontend/.env.production มี VITE_API_BASE_URL ว่าง. ตั้ง DB_FILE ไปยัง persistent disk หากใช้ SQLite บน cloud. GitHub Pages เสิร์ฟได้เฉพาะ static frontend/report จึงไม่สามารถรัน Express/SQLite ได้. เว็บรายงานใน publish/ แสดงหลักฐานทดสอบ; full-stack ต้องใช้ Node host ตาม render.yaml. ยังไม่ได้เผยแพร่ cloud URL จริงหรือสร้าง PR/tag ในรอบนี้


## References & AI Assistance

- Source: starter และคู่มือจาก engse203-lab ของอาจารย์
- AI tool: OpenAI Codex ช่วยวิเคราะห์ แก้โค้ด เขียน test และจัดรายงาน
- นักศึกษาต้องตรวจและอธิบายโค้ดด้วยตนเอง; ยังไม่ได้บันทึก reflection หรืออ้างว่ามีการสาธิตส่วนตัว

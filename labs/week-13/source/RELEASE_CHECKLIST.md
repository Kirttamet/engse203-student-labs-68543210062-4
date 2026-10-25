# Release checklist — LAB13

- [x] API และ frontend tests ผ่านในเครื่อง
- [x] Frontend production build ผ่าน และ login/delete/logout บน localhost production ผ่าน
- [x] secret อยู่ใน environment ไม่ใส่ค่าจริงใน repo; env example มี JWT_SECRET ว่าง
- [x] README มีวิธีติดตั้ง/รัน บัญชี seed และวิธีตั้ง production
- [x] render.yaml ให้ host สุ่ม JWT_SECRET
- [x] Production npm audit API และ frontend ไม่มีช่องโหว่หลังอัปเดต body-parser 2.4.0
- [ ] นักศึกษาตรวจและอธิบายโค้ดด้วยตนเอง
- [ ] CI ผ่านบน GitHub (ยังไม่ push)
- [ ] เปิด /api/health บน URL deploy จริง (ยังไม่ deploy)
- [ ] เปลี่ยนบัญชี seed ก่อนใช้กับข้อมูลจริง และเตรียม persistent database
- [ ] เปิด PR และสร้าง submission tag หลัง merge โดยนักศึกษา

รายการที่ยังไม่ทำไม่ได้ถูกอ้างว่าผ่านแล้ว. Render เป็นการเตรียม config ยังไม่มี service ออนไลน์

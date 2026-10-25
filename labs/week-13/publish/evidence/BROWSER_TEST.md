# Browser test — LAB13

ทดสอบ build จริงผ่าน Express production ที่ localhost:4313. สร้าง JWT_SECRET สุ่มเฉพาะ process และใช้ DB_FILE=:memory: จึงไม่กระทบ campus.db ที่ส่งงาน

- Dashboard โหลดข้อมูลจาก API บน origin เดียวกัน
- เข้าสู่ระบบด้วย staff seed สำเร็จ แสดงสถานะเจ้าหน้าที่
- ลบ REQ-005 ได้จริง รายการลดจาก 5 เป็น 4 (เปลี่ยนเฉพาะฐานข้อมูล memory)
- Logout กลับเป็นแบบฟอร์ม login
- Console error: ไม่พบ
- หลังเปลี่ยนป้ายชื่อเป็น LAB13 และ rebuild ได้ทดสอบ login ซ้ำสำเร็จ
- ภาพจริง: production-login.png

ไม่มี deployment ออนไลน์หรือวิดีโอของนักศึกษาถูกสร้างในขั้นตอนนี้

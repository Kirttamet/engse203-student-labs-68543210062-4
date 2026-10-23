# Demo checklist (ยังไม่มีวิดีโอหรือ URL cloud จริง)

1. เปิด /api/health ให้ database.connected เป็น true
2. เปิด dashboard, สร้างคำร้อง แล้วตรวจ GET /api/requests
3. เปลี่ยนสถานะ แล้ว refresh ตรวจค่าที่บันทึก
4. ลบรายการแล้วตรวจว่า GET ตอบ 404
5. ทดสอบ production หน้า / ต้องเป็น HTML และ /api/nope ตอบ JSON 404

ผลอัตโนมัติที่ทำแล้วดู ../evidence/CHECKER.txt และ API_TEST.txt; checklist นี้ไม่ใช่หลักฐานว่านักศึกษาได้อัดวิดีโอแล้ว

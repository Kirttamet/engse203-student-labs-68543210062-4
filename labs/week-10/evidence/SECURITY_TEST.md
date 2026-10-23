# SQL injection tests

ใช้ Supertest กับ SQLite :memory: แยกจาก campus.db

- status="x' OR '1'='1" → HTTP 200, []
- status="'; DROP TABLE requests; --" → HTTP 200, []
- status="pending' OR status='completed" → HTTP 200, []

หลังทดสอบยังอ่าน requests ได้ 5 รายการ ตารางไม่ถูกลบ เพราะค่าผู้ใช้ bind ผ่าน ? และไม่ถูกตีความเป็น SQL

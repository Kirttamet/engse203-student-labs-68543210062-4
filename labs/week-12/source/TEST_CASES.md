# Test cases — boundary และ API

| รหัส | กลุ่ม | ข้อมูลที่เปลี่ยน | ผลที่คาดหวัง | ระดับ |
|---|---|---|---|---|
| TC-01 | ถูกต้อง | ทุกช่องถูกต้อง | 201 | integration |
| TC-02 | ค่าขอบ | รายละเอียด 9 ตัว | มี error | unit |
| TC-03 | ค่าขอบ | รายละเอียด 10 ตัว | ผ่าน | unit |
| TC-04 | ค่าขอบ | รายละเอียด 11 ตัว | ผ่าน | unit |
| TC-05 | ค่าขอบ | ชื่อ 1 ตัว | มี error | unit |
| TC-06 | ค่าขอบ | ชื่อ 2 ตัว | ผ่าน | unit |
| TC-07 | ค่าว่าง | สถานที่เป็นช่องว่าง | มี error | unit |
| TC-08 | enum | priority ไม่อยู่ในรายการ | มี error | unit |
| TC-09 | body | null / array / number | มี error | unit |
| TC-10 | regression | ลบ REQ-002 แล้ว POST | 201 ไม่ซ้ำ | integration |
| TC-11 | regression | PUT REQ-999 | 404 | integration |
| TC-12 | regression | status in-progress | inProgress เพิ่ม | frontend |
| TC-13 | security | SQL injection ใน status | array ว่าง | integration |

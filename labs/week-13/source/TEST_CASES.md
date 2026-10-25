# Security test cases — LAB13 และค่าขอบ (boundary)

| รหัส | กรณี | คาดหวัง |
|---|---|---|
| TC-01 | ชื่อ 100/101 ตัว | ผ่าน / ปฏิเสธ |
| TC-02 | สถานที่ 100/101 ตัว | ผ่าน / ปฏิเสธ |
| TC-03 | รายละเอียด 1000/1001 ตัว | ผ่าน / ปฏิเสธ |
| TC-04 | string fields เป็น number | ปฏิเสธ |
| TC-05 | body เกิน 10kb | 413 JSON |
| TC-06 | hash รหัสเดียวกันสองครั้ง | hash ต่างกัน รูป scrypt$salt$hash |
| TC-07 | password ถูก/ผิด และ malformed hash | true / false โดยไม่ crash |
| TC-08 | login บัญชี staff ถูก | 200 token ไม่มี passwordHash |
| TC-09 | login ผิด / email ไม่พบ | 401 ข้อความเดียวกัน |
| TC-10 | PUT ไม่มี/ปลอม/หมดอายุ token | 401 |
| TC-11 | requester token PUT | 403 |
| TC-12 | staff PUT/DELETE | 200 / 204 |
| TC-13 | GET/POST ไม่ login | 200 / 201 |
| TC-14 | ลบรายการกลางแล้วสร้างใหม่ | 201 ไม่ซ้ำ (regression) |
| TC-15 | production ไม่มี secret | process ล้มก่อนเริ่ม server |
| TC-16 | production malformed JSON | 400 ไม่ส่ง stack |
| TC-17 | login ผิด 5 ครั้ง แล้วลองถูก | 429 |
| TC-18 | response headers | nosniff / DENY / no-referrer |
| TC-19 | frontend caller ส่ง custom headers | เก็บ custom header และแนบ Bearer |
| TC-20 | frontend ได้ 401 | ล้าง token และแจ้ง error |
| TC-21 | 204 / network failure | null / ApiError status 0 |

| TC-22 | รายละเอียด 9/10/11 ตัว | ปฏิเสธ / ผ่าน / ผ่าน |
| TC-23 | ชื่อ 1/2 ตัว | ปฏิเสธ / ผ่าน |

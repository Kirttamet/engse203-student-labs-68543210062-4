# Debug log — LAB12

วันที่ทดสอบ 25 ตุลาคม 2026. ใช้ automated tests และ stack trace จริง ไม่ได้อ้างว่าเปิด VS Code breakpoint หรือทำ UAT ด้วยตนเอง. ผลก่อนแก้อยู่ ../evidence/RED_API.txt และ RED_FRONTEND.txt

## BUG #0 · รายละเอียด 10 ตัวอักษรถูกปฏิเสธ

**อาการ:** ข้อมูลที่ตรงขั้นต่ำได้รับ validation error

**วิธีทำซ้ำ:** validateRequestInput ด้วย details 1234567890

**เครื่องมือ:** Vitest / Supertest และ stack trace ใน RED logs

**สาเหตุ (ไฟล์:บรรทัด):** ใช้ <= MIN_DETAILS ทำให้ปฏิเสธค่าที่เท่ากับ 10; ตำแหน่งหลังแก้ api/src/validators/requestValidator.js:37

**วิธีแก้:** เปลี่ยน <= เป็น <

**test ที่กัน:** api/tests/unit/requestValidator.test.js — valid minimum accepted; ทดสอบ 9/10/11 ตัว

## BUG #1 · ลบรายการกลางแล้ว POST ได้ 500

**อาการ:** ลบ REQ-002 แล้วสร้างใหม่พบ UNIQUE constraint failed: requests.id

**วิธีทำซ้ำ:** DELETE /api/requests/REQ-002 แล้ว POST คำร้องที่ถูกต้อง

**เครื่องมือ:** Vitest / Supertest และ stack trace ใน RED logs

**สาเหตุ (ไฟล์:บรรทัด):** COUNT(*) + 1 ได้เลขที่ยังมีอยู่หลังลบรายการกลาง; ตำแหน่งหลังแก้ api/src/services/requestService.js:102

**วิธีแก้:** ใช้ MAX ของเลขท้าย id ที่ cast เป็น INTEGER แล้วบวก 1 แทนจำนวนแถว

**test ที่กัน:** api/tests/integration/requests.api.test.js — ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม

## BUG #2 · Dashboard นับกำลังดำเนินการเป็นศูนย์

**อาการ:** ข้อมูล API มี in-progress แต่ summary.inProgress เป็น 0

**วิธีทำซ้ำ:** summarizeRequests ด้วย pending, in-progress, completed

**เครื่องมือ:** Vitest / Supertest และ stack trace ใน RED logs

**สาเหตุ (ไฟล์:บรรทัด):** summary ใช้ in progress ซึ่งไม่ตรง enum in-progress ของ API; ตำแหน่งหลังแก้ frontend/src/utils/requestSummary.js:12

**วิธีแก้:** เปรียบเทียบ in-progress ให้ตรง API

**test ที่กัน:** frontend/src/utils/requestSummary.test.js — API status in-progress contributes to dashboard summary

## BUG #3 · PUT คำร้องที่ไม่มีอยู่ได้ 500

**อาการ:** TypeError: Cannot read properties of null (reading id)

**วิธีทำซ้ำ:** PUT /api/requests/REQ-999 พร้อม status completed

**เครื่องมือ:** Vitest / Supertest และ stack trace ใน RED logs

**สาเหตุ (ไฟล์:บรรทัด):** อ่าน updated.id ใน console.log ก่อนตรวจ updated เป็น null; ตำแหน่งหลังแก้ api/src/controllers/requestController.js:30

**วิธีแก้:** นำการอ่านก่อน null guard ออก ให้คืน 404 เมื่อไม่พบคำร้อง

**test ที่กัน:** api/tests/integration/requests.api.test.js — คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)

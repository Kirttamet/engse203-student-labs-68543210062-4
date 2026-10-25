# Debug log — LAB13

เริ่มจาก starter ของอาจารย์: ผลก่อนแก้ 43 ผ่าน / 13 ไม่ผ่าน ใน evidence/RED_API.txt. password test 10 ข้อไม่ผ่านเพราะ hash/verify ยังเป็น TODO; auth 3 ข้อไม่ผ่านเพราะ login route ยังไม่ผูกและ PUT ยังเปิด public

1. CP48: เพิ่ม type และ max-length validation พร้อม body limit. ตรวจ boundary tests และ HTTP 413
2. CP49: สุ่ม salt เป็น hex string ใช้ scryptSync 64 bytes และ timingSafeEqual. seed hash ต้องตรวจผ่าน; malformed stored hash คืน false
3. CP50: findUserByEmail คืน passwordHash (camelCase). ส่งค่านี้ให้ verifyPassword และออก JWT ที่ไม่รวม hash
4. CP51: ผูก authenticate → requireRole('staff') เฉพาะ PUT/DELETE. เปลี่ยน regression tests ให้ login ก่อน ไม่แก้ assertion ให้รับ 401 แทนผลที่ควรได้
5. CP52: fail-fast เมื่อ production ไม่มี secret; error handler เดิมปิด stack ใน production; เพิ่ม env example ค่าว่าง
6. Challenge: จำกัด login per-IP และ export resetLoginLimiter เพื่อแยก state ก่อนแต่ละ test. API client รวม headers หลัง options ป้องกัน caller ทำ Authorization หาย และล้าง token เมื่อ 401

เครื่องมือที่ใช้จริง: Vitest, Supertest, V8 coverage, checker อาจารย์ และ build. ไม่อ้างการเปิด interactive breakpoint หรือวิดีโอสาธิต. Regression ของ Week12 ยังอยู่ใน starter/tests

# Regression เดิมจาก LAB12 — starter ของ LAB13 แก้แล้ว
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


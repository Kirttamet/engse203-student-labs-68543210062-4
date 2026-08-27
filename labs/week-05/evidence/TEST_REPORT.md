# ENGSE203 LAB05 — Student Test Report

**ชื่อ–รหัส:** กฤตเมธ สินธใส - 685432100624
**OS / Browser / Node:** Windows / Chrome / v22.23.2
**Branch / Commit:** `lab/week-05` / 

กรอก Actual result จากการรันจริง ใช้ `PASS`, `FAIL` หรือ `NOT RUN` และอ้างหลักฐานแบบ relative path

| Test ID | Preconditions / procedure summary | Actual result | Status | Evidence / Notes |
|---|---|---|---|---|
| TC-L5-01 | เปิด `#/` | แสดง Dashboard พร้อม Summary Cards และรายการคำร้องทั้งหมด | PASS | `images/persistence-delete-refresh.png` |
| TC-L5-02 | ใช้ navigation 3 รายการ | สลับไปยัง Dashboard, New Request, About | NOT RUN | ยังไม่ได้ทดสอบ/แคปหน้าจอ |
| TC-L5-03 | เปิด/refresh `#/requests/new` | เปิดหน้าฟอร์มสร้างคำร้องใหม่ | PASS | `images/form-validation-error.png` |
| TC-L5-04 | เปิด `#/requests/REQ-001` | แสดงรายละเอียดคำร้องรหัส REQ-001 ครบถ้วน | PASS | `images/route-detail-found.png` |
| TC-L5-05 | เปิด `#/requests/REQ-999` | คาดว่าแสดง "ไม่พบคำร้องรหัส REQ-999" พร้อมปุ่มกลับ | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-06 | เปิด `#/unknown` | คาดว่าแสดง NotFoundPage | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-07 | ลบ LAB05 key แล้วเปิด Dashboard | อ่าน seed จาก JSON มาแสดงและเขียนลง localStorage | PASS | `images/storage-localstorage-devtools.png` |
| TC-L5-08 | สังเกตช่วง latency | แสดง LoadingState ระหว่างรอ | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-09 | เปิด `#/?scenario=error` | คาดว่าแสดง ErrorState พร้อมปุ่ม "ลองอีกครั้ง" | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-10 | กด Retry | โหลดข้อมูลใหม่สำเร็จ | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-11 | เปิด `#/?scenario=empty` | คาดว่าแสดง EmptyState | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-12 | รัน public checker | ตรวจผ่านสัญญา (contracts) ทั้งหมด | PASS | `npm run check` → 133/133 PASS |
| TC-L5-13 | submit form ผิด validation | แสดงข้อความแจ้งเตือนสีแดงใต้ field และไม่บันทึกข้อมูล | PASS | `images/form-validation-error.png` |
| TC-L5-14 | เพิ่ม valid request แล้ว refresh | สร้าง REQ-ID ใหม่ (`REQ-MTBW8CCJ-2AG4`) และบันทึกคงอยู่หลัง refresh | PASS | `images/persistence-add-refresh.png` |
| TC-L5-15 | ทดสอบ filters ทุกค่า | กรองรายการตามสถานะได้ถูกต้อง | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-16 | ลบ request แล้ว refresh | ลบคำร้อง `REQ-MTBW8CCJ-2AG4` สำเร็จ กลับเหลือ 3 รายการเดิมและคงอยู่หลัง refresh | PASS | `images/persistence-delete-refresh.png` |
| TC-L5-17 | Reset Demo Data | แสดง popup ยืนยันก่อนล้าง localStorage และโหลด seed กลับมา | PASS | `images/reset-demo-data.png` |
| TC-L5-18 | malformed + wrong schema แล้ว reload | คาดว่ากู้คืนเป็น seed JSON และแจ้งเตือน recovery | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-19 | เทียบ summary กับ data | จำนวนใน Summary Cards ตรงกับรายการจริง (ทั้งหมด 3 / รอดำเนินการ 1 / กำลังดำเนินการ 1 / เสร็จสิ้น 1) | PASS | `images/persistence-delete-refresh.png` |
| TC-L5-20 | viewport 375px ทุก page | responsive บนมือถือ | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-21 | keyboard only | ใช้งานด้วยแป้นพิมพ์ล้วน | NOT RUN | ยังไม่ได้ทดสอบ |
| TC-L5-22 | checker/build/preview | รัน `npm run check` และ `npm run build` ผ่านไม่มี error | PASS | build สำเร็จ (`dist/`), `npm run preview` ยังไม่ได้ลอง |
| TC-L5-23 | Pages Incognito + hash refresh | หน้าเว็บบน GitHub Pages refresh Hash URL ได้ไม่ 404 | NOT RUN | ยังไม่ได้ deploy ขึ้น Pages |
| TC-L5-24 | merged PR + tag | รวม PR และติด tag `lab-05-submission-v1` | NOT RUN | ยังไม่ได้เปิด/merge PR |

## Rerun log

เก็บบันทึกกรณีมีการแก้ไขปัญหาระหว่างพัฒนา

| Test ID | เวลา | Fix | Actual result | Status |
|---|---|---|---|---|
| — | — | — | — | — |

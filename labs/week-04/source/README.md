# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: กฤตเมธ สินธุใส
- รหัสนักศึกษา: 68543210062-4
- Section: Sec 2

## URLs

- Repository: [(https://github.com/Kirttamet/engse203-student-labs-68543210062-4)]
- Pull Request: [(https://github.com/Kirttamet/engse203-student-labs-68543210062-4/pull/4)]
- GitHub Pages: [(https://kirttamet.github.io/engse203-student-labs-68543210062-4/)]

## Component Tree

```text
main.jsx
└─ App.jsx                (state: requests[], statusFilter)
   ├─ AppHeader            (props: title, subtitle)
   ├─ SummaryPanel         (props: summary)
   ├─ RequestForm          (props: onAddRequest)
   │     └─ local state: formData, errors, feedback
   ├─ FilterBar            (props: value, onFilterChange)
   └─ RequestList          (props: requests, onDeleteRequest)
         └─ RequestCard    (props: request, onDeleteRequest) — 1 ตัวต่อ 1 รายการใน requests
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

**State ทั้งหมดอยู่ที่ `App.jsx`** ซึ่งเป็น single source of truth ของแอป:

- `requests` (array) — รายการคำร้องทั้งหมด เริ่มต้นจาก `initialRequests.js`
- `statusFilter` (string) — ตัวกรองสถานะที่กำลังเลือกอยู่ (`all` / `pending` / `in-progress` / `completed`)

ค่า `summary` และ `filteredRequests` **ไม่ใช่ state** แต่เป็นค่าที่คำนวณใหม่ทุกครั้งที่ re-render (derived values) จาก `requests` และ `statusFilter`

**การไหลของ props (ลงจาก App ไปยัง child):**

- `AppHeader` รับ `title`, `subtitle` — เป็น static text ไม่เกี่ยวกับ state
- `SummaryPanel` รับ `summary` (object ที่คำนวณจาก `requests`)
- `RequestForm` รับ `onAddRequest` (callback) และดูแล state ของตัวเองแยกต่างหาก คือ `formData`, `errors`, `feedback` — state พวกนี้เป็น local state เฉพาะฟอร์ม ไม่ถูกยกขึ้นไปที่ App เพราะ App ไม่จำเป็นต้องรู้ค่ากลางระหว่างพิมพ์
- `FilterBar` รับ `value` (=`statusFilter`) และ `onFilterChange` (=`setStatusFilter` ส่งตรงจาก App)
- `RequestList` รับ `filteredRequests` (ส่งผ่าน prop ชื่อ `requests`) และ `onDeleteRequest`
- `RequestCard` รับ `request` (object เดียว) และ `onDeleteRequest` ต่อจาก `RequestList`

**การไหลของ callback (ขึ้นจาก child กลับไปที่ App):**

1. ผู้ใช้กรอกฟอร์มใน `RequestForm` → submit ผ่านการ validate ภายในตัวมันเอง → เรียก `onAddRequest(requestData)` → ไปทำงานที่ `handleAddRequest` ใน `App.jsx` → `setRequests` เพิ่มรายการใหม่ (พร้อม `id` และ `status: 'pending'` ที่ App เป็นคนกำหนด)
2. ผู้ใช้กดปุ่มใน `FilterBar` → เรียก `onFilterChange(filterValue)` ซึ่งคือ `setStatusFilter` ตรง ๆ → `statusFilter` เปลี่ยน → `filteredRequests` ถูกคำนวณใหม่
3. ผู้ใช้กดปุ่มลบใน `RequestCard` → เรียก `onDeleteRequest(request.id)` → ส่งผ่าน `RequestList` ขึ้นไปที่ `handleDeleteRequest` ใน `App.jsx` → `setRequests` กรองรายการที่ id ตรงกันออก

## Test Evidence

> ⚠️ ตารางนี้ต้องกรอกจากการทดสอบจริงบน dev server / build ของคุณเอง — ผลลัพธ์และภาพหลักฐานด้านล่างเป็น TODO ทั้งหมด ไม่ได้ถูกจำลองหรือกรอกล่วงหน้าให้

| Test ID | Scenario | Expected Result | Actual Result | Status | Evidence |
|---|---|---|---|---|---|
| **TC-01** | Initial render | Render คำร้องเริ่มต้น 3 รายการ และ Summary แสดง (Total: 3, Pending: 1, In-Progress: 1, Completed: 1) โดยไม่มี error ใน console | แสดงคำร้อง 3 รายการ และสรุปจำนวนถูกต้อง ตรงตาม initialRequests | **PASS** | `evidence/desktop.png` |
| **TC-02** | Controlled input | ทุก input field (ชื่อ, ประเภท, สถานที่, รายละเอียด, priority) เปลี่ยนตาม React state (`formData`) | แบบฟอร์มตอบสนองทันทีตาม state ทุก field | **PASS** | `evidence/desktop.png` |
| **TC-03** | Invalid submit | เมื่อส่งแบบฟอร์มที่ไม่ผ่านกฎ validation จะไม่เพิ่มรายการ แสดงข้อความ error ใกล้ field และตั้ง `aria-invalid="true"` | ไม่เพิ่มรายการ แสดง error สีแดงใกล้ field และ input มีขอบสีแดงพร้อม aria-invalid | **PASS** | `evidence/validation-error.png` |
| **TC-04** | Valid submit | เมื่อกรอกข้อมูลถูกต้องและเพิ่มคำร้อง คำร้องใหม่จะอยู่ในสถานะ pending, summary เพิ่มขึ้น 1, และ reset แบบฟอร์มพร้อมแสดง feedback `role="status"` | เพิ่ม REQ-004 สถานะ pending สำเร็จ Summary total/pending เพิ่มขึ้น รูปแบบฟอร์มถูก reset | **PASS** | `evidence/success-result.png` |
| **TC-05** | Filter status | เมื่อเลือก filter แต่ละสถานะ (pending, in-progress, completed) จะแสดงเฉพาะคำร้องในสถานะที่เลือก | แสดงผลเฉพาะคำร้องในสถานะที่เลือกตรงตามปุ่ม active | **PASS** | `evidence/desktop.png` |
| **TC-06** | Return all | เมื่อเลือกปุ่ม filter "ทั้งหมด" จะแสดงคำร้องทุกสถานะ | แสดงคำร้องทั้งหมดกลับคืนมา | **PASS** | `evidence/desktop.png` |
| **TC-07** | Empty state | เมื่อเลือกสถานะที่ไม่มีรายการ หรือลบรายการจนหมด จะแสดงข้อความ empty state (`requests.length === 0`) | แสดงกล่อง empty state "ไม่พบรายการคำร้องที่ตรงตามเงื่อนไข" | **PASS** | `evidence/validation-error.png` |
| **TC-08** | Delete | เมื่อกดปุ่มลบคำร้อง คำร้องที่มี ID นั้นจะถูกลบออกด้วย immutable `.filter()`, Summary อัปเดต | คำร้องถูกลบตาม ID สรุปอัปเดตทันที รายการอื่นคงเดิม | **PASS** | `evidence/success-result.png` |
| **TC-09** | 375px responsive | UI ปรับขนาดรองรับหน้าจอสัมผัสขนาดเล็ก 375px โดยไม่มี horizontal scrollbar | Layout ปรับเป็นแนวตั้ง สวยงาม สมบูรณ์ ไม่ล้นจอ | **PASS** | `evidence/mobile-375.png` |
| **TC-10** | Keyboard accessibility | บังคับทิศทางด้วย Tab/Enter/Space บนปุ่มและแบบฟอร์มได้ถูกต้อง | Focus ring แสดงชัดเจน ปุ่มและแบบฟอร์มใช้งานด้วยคีย์บอร์ดได้ครบถ้วน | **PASS** | `evidence/desktop.png` |
| **TC-11** | Build & Check | `npm run check` และ `npm run build` ผ่าน 100% | Vite build สำเร็จโดยไม่มี error | **PASS** | Console output |
| **TC-12** | Pages Incognito | หน้ารวม Pages Hub และ Weekly Result โหลดครบถ้วนบน Incognito | โหลดสินทรัพย์ CSS/JS ถูกต้อง ไม่พบ HTTP 404 | **PASS** | Pages Hub URL |

## Screenshots

### 1. Desktop Interface Overview (`desktop.png`)
![Desktop UI](evidence/desktop.png)

### 2. Form Validation Error State (`validation-error.png`)
![Validation Error State](evidence/validation-error.png)

### 3. Valid Submission & Summary Update (`success-result.png`)
![Success Submission State](evidence/success-result.png)

### 4. Mobile 375px Responsive View (`mobile-375.png`)
![Mobile 375px View](evidence/mobile-375.png)


## Week 03 → Week 04 Reflection

ในการทำ LAB 4 มีการใช้ ChatGPT เป็นตัวช่วยสำหรับทำความเข้าใจวิธีทำงานของ React และใช้เป็นแนวทางในการตรวจดูโครงสร้างของโปรเจกต์ โดยเนื้อหาที่ศึกษาเกี่ยวข้องกับการแบ่ง Components, การส่ง Props, การจัดการ State, การทำ Controlled Form, การตรวจสอบข้อมูล รวมถึง Callback, Responsive CSS และ Accessibility

จากคำแนะนำที่ได้ มีการนำบางส่วนมาปรับใช้กับโค้ดจริง เช่น การควบคุมข้อมูลด้วย React State การจัดการฟอร์มผ่าน Controlled Component และการเปลี่ยนแปลงข้อมูลโดยสร้าง State ใหม่แทนการแก้ค่าตัวเดิมโดยตรง รวมถึงการส่งฟังก์ชันจาก Parent ลงไปให้ Child เรียกใช้งาน นอกจากนี้ยังเพิ่มการตรวจสอบความถูกต้องของข้อมูลและกำหนด Attribute ด้าน Accessibility อย่าง `aria-invalid` และ `role="status"`

สำหรับขั้นตอนสุดท้าย ผู้จัดทำเป็นผู้ลงมือทดสอบระบบด้วยตนเอง โดยตรวจสอบด้วยคำสั่ง `npm run check`, `npm run build` และ `npm run preview` จากนั้นทดลองใช้งานจริงทั้งการเพิ่ม ลบ และกรองคำร้อง การกรอกข้อมูลที่ไม่ถูกต้อง การตรวจสอบหน้าจอในขนาด 375px และการควบคุมหน้าเว็บด้วย Keyboard เพื่อให้แน่ใจว่าระบบพร้อมใช้งานก่อนส่งงาน


## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า "ไม่ได้ใช้"

TODO — ตัวอย่างถ้าคุณใช้ตัวช่วยนี้จริง: "ใช้ Claude ช่วยวิเคราะห์โค้ดเพื่อร่าง Component Tree และคำอธิบาย State/Props/Callback ใน README ตรวจสอบความถูกต้องโดยอ่านโค้ดใน App.jsx/RequestForm.jsx/RequestList.jsx เทียบกับที่ Claude สรุป"
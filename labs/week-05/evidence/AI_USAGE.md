# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Claude (Cowork) | ช่วยแนะนำและตรวจสอบโค้ดบางส่วนของ pages/components/services เช่น routing, form validation, effect cleanup, service layer และ localStorage persistence | ใช้เป็นแนวทางและช่วยแก้ไข logic บางจุดในไฟล์ `src/` ของแต่ละหน้า โดยฉันเป็นผู้เขียนและปรับโค้ดส่วนหลักด้วยตนเอง | รัน `npm run check` (ผ่าน 133/133) และรัน `npm run dev` ทดสอบจริงในเบราว์เซอร์ เช่น เพิ่ม/ลบคำร้อง, validation, refresh เพื่อดู persistence, ตรวจสอบ localStorage และ Reset Demo Data | นำเฉพาะคำแนะนำและโค้ดบางส่วนที่ตรวจสอบแล้วมาใช้ พร้อมอ่านและปรับโค้ดให้เข้าใจการทำงานของ final code ด้วยตนเอง |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ

- [x] ตรวจ source และรัน test ด้วยตนเอง

- [x] ใช้ AI ช่วยเฉพาะบางส่วนของ pages/components/services และปรับแก้โค้ดด้วยตนเอง

- [x] สามารถอธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้
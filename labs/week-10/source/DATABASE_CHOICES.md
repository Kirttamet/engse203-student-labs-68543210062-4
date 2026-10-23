# Database choices

SQLite ใช้ไฟล์เดียว จัดการง่ายและรองรับ transaction, JOIN, constraints เหมาะกับห้องเรียนและระบบขนาดเล็ก. หลาย instance ไม่ควรแชร์ไฟล์ผ่าน network filesystem; บน hosting ที่ disk ชั่วคราวข้อมูลจะหายเมื่อ restart จึงต้องใช้ persistent disk หรือฐานข้อมูลภายนอก

NoSQL เช่น MongoDB เก็บ document ยืดหยุ่น เหมาะเมื่อรูปข้อมูลแตกต่างกัน แต่ยังต้องออกแบบ validation, index และความสอดคล้อง. ไม่ได้แปลว่าไม่มี schema หรือใช้แทน relational database ได้ทุกกรณี

node:sqlite DatabaseSync เป็น synchronous และ block event loop ขณะ query. ระบบโหลดสูงควรใช้ worker หรือ driver แบบ async. เปลี่ยนเป็น async ต้องเปลี่ยน service ให้คืน Promise และ controller ต้อง await/catch ให้ครบ; frontend ไม่จำเป็นต้องรู้ชนิด database เพราะใช้ API contract เดิม

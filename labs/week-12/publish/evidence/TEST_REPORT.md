# LAB12 test report — 25 ตุลาคม 2026

เริ่มจาก starter Week12 ของอาจารย์ ออกแบบ TEST_CASES แล้วเพิ่ม regression tests ก่อนแก้

| ขั้นตอน | ผล |
|---|---|
| RED API | 3 failed / 41 passed: BUG #0, #1, #3 |
| RED frontend | 1 failed / 1 passed: BUG #2 |
| GREEN API | 44 passed |
| GREEN frontend | 2 passed |
| API statements coverage | 85.9% |
| Frontend production build | PASS |
| Seed database | 5 requests / 4 users |
| อาจารย์ checker | 20/20 ข้อบังคับ + 2/2 challenge = 22/22 |

Tests ใช้ SQLite :memory: แยกจาก campus.db; CI ถูกเตรียมไว้ที่ .github/workflows/lab12-tests.yml แต่ยังไม่ได้รันบน GitHub เพราะยังไม่ push. ไม่อ้างว่าใช้ interactive breakpoint หรือทำ UAT ส่วนตัว

ปรับเฉพาะ LAB12 ให้ API client ใช้ same-origin ใน production โดยไม่ต้องเก็บ .env.production ที่ตัว verify ของ repo ห้ามไว้. ค่า dev ยังเป็น localhost:3001 และรองรับ VITE_API_BASE_URL ตามเดิม

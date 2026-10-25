# LAB13 test report

| ตรวจ | ผลจริง |
|---|---|
| Starter ก่อนทำ CP49–51 | 43 ผ่าน / 13 ไม่ผ่าน |
| API หลังแก้ | 71 tests ผ่าน |
| Frontend | 6 tests ผ่าน |
| API statements coverage | 87.5% |
| อาจารย์ Week13 checker | 23/23 ข้อบังคับ + 4/4 challenge = 27/27 |
| Week12 regression checker | 20/20 |
| Frontend production build | ผ่าน |
| Browser production login / delete / logout | ผ่าน บน database memory |
| Production dependency audit API + frontend | 0 ช่องโหว่ |
| Seed campus.db | 5 requests / 5 users รวมบัญชี staff |

## งานที่ทำ

CP48 ตรวจ string, enum, min/max และจำกัด JSON 10kb; CP49 scrypt พร้อม salt และ timingSafeEqual; CP50 JWT login; CP51 staff auth 401/403; CP52 fail-fast production secret และไม่ส่ง stack; ส่วนเสริมคือ headers, login rate limit, frontend Bearer และ Render generateValue

## Dependency fix

audit ของ starter พบ body-parser ระดับ high ตาม [GHSA-27r3-jxmh-p828](https://github.com/advisories/GHSA-27r3-jxmh-p828). อัปเดต lockfile เฉพาะ LAB13 ให้ใช้ body-parser 2.4.0 แล้วตรวจ audit ใหม่ได้ 0 และรัน checker/tests ซ้ำผ่าน. ไม่มีการอัปเดต dependency ของ LAB ก่อนหน้า

## ขอบเขต

ใช้ Node 24 และฐานข้อมูลแยกในการทดสอบ. ยังไม่ commit/push, ไม่มี PR/tag จริง, CI ยังไม่รันบน GitHub และไม่ได้ deploy Render. หลักฐานก่อนแก้ RED_API.txt, หลังแก้ GREEN_API.txt/COVERAGE.txt/CHECKER.txt และ BROWSER_TEST.md

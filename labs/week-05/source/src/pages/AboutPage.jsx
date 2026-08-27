export default function AboutPage() {
  return (
    <section data-testid="page-about">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">ABOUT THE LAB</p>
          <h1>เกี่ยวกับระบบ</h1>
        </div>
      </div>
      <article className="panel prose">
        <p>Campus Service Request เป็นกรณีศึกษาสำหรับฝึกใช้งาน React Router, Effect, Service Layer และการเก็บข้อมูลฝั่ง client</p>
        <h2>สถาปัตยกรรม</h2>
        <p>หน้าต่าง ๆ เรียกใช้งานผ่าน Service เท่านั้น ส่วน Service จะจัดการทั้งข้อมูลตัวอย่างและการอ่าน/เขียน storage โดย UI ไม่แตะ browser storage โดยตรง</p>
        <h2>ความเป็นส่วนตัว</h2>
        <p>ข้อมูลทั้งหมดใน LAB เป็นข้อมูลจำลอง ห้ามบันทึกข้อมูลส่วนบุคคลจริง รหัสผ่าน token หรือ secret ใด ๆ</p>
      </article>
    </section>
  );
}

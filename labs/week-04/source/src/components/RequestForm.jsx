import { useState } from 'react';

const initialFormData = {
  requesterName: '',
  requestType: '',
  location: '',
  details: '',
  priority: 'normal',
};

function validateRequest(formData) {
  const errors = {};

  if (formData.requesterName.trim().length < 2) {
    errors.requesterName = 'กรุณาระบุชื่อผู้แจ้งอย่างน้อย 2 ตัวอักษร';
  }

  if (!formData.requestType) {
    errors.requestType = 'กรุณาเลือกประเภทคำร้อง';
  }

  if (formData.location.trim().length === 0) {
    errors.location = 'กรุณาระบุสถานที่';
  }

  if (formData.details.trim().length < 10) {
    errors.details = 'กรุณาระบุรายละเอียดอย่างน้อย 10 ตัวอักษร';
  }

  return errors;
}

function RequestForm({ onAddRequest }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setFeedback('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateRequest(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback('ยังส่งคำร้องไม่ได้ กรุณาตรวจข้อมูลที่ระบุ');
      return;
    }

    onAddRequest({
      ...formData,
      requesterName: formData.requesterName.trim(),
      location: formData.location.trim(),
      details: formData.details.trim(),
    });
    setFormData(initialFormData);
    setFeedback('ส่งคำร้องใหม่เรียบร้อยแล้ว');
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">แจ้งคำร้องใหม่</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input
            id="requesterName"
            name="requesterName"
            value={formData.requesterName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.requesterName)}
            aria-describedby="requesterName-error"
          />
          <small className="error" id="requesterName-error">
            {errors.requesterName}
          </small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.requestType)}
            aria-describedby="requestType-error"
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="ขอยืมอุปกรณ์">ขอยืมอุปกรณ์</option>
            <option value="ขอเอกสาร">ขอเอกสาร</option>
            <option value="อื่นๆ">อื่นๆ</option>
          </select>
          <small className="error" id="requestType-error">
            {errors.requestType}
          </small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            aria-invalid={Boolean(errors.location)}
            aria-describedby="location-error"
          />
          <small className="error" id="location-error">
            {errors.location}
          </small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <input
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            aria-invalid={Boolean(errors.details)}
            aria-describedby="details-error"
          />
          <small className="error" id="details-error">
            {errors.details}
          </small>
        </div>

        <div className="field">
          <label htmlFor="priority">ความสำคัญ</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="normal">ปกติ</option>
            <option value="urgent">ด่วน</option>
          </select>
        </div>

        <button type="submit">ส่งคำร้อง</button>
        <p className="status" role="status">
          {feedback}
        </p>
      </form>
    </section>
  );
}

export default RequestForm;

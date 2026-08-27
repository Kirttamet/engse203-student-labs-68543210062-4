import { useState } from 'react';

const EMPTY_FORM = {
  requesterName: '',
  requestType: '',
  location: '',
  details: '',
  priority: 'normal',
};

const REQUEST_TYPES = ['แจ้งซ่อม', 'ขอใช้ห้อง', 'บริการบัญชีผู้ใช้'];

function validateForm(form) {
  const errors = {};
  if (form.requesterName.trim().length < 2) {
    errors.requesterName = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
  }
  if (!form.requestType) {
    errors.requestType = 'กรุณาเลือกประเภทคำร้อง';
  }
  if (!form.location.trim()) {
    errors.location = 'กรุณาระบุสถานที่';
  }
  if (form.details.trim().length < 10) {
    errors.details = 'กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร';
  }
  if (!['normal', 'urgent'].includes(form.priority)) {
    errors.priority = 'กรุณาเลือกความเร่งด่วน';
  }
  return errors;
}

function FieldError({ id, message }) {
  return <small className="error" id={id}>{message ?? ''}</small>;
}

function fieldA11y(fieldName, errors) {
  return {
    'aria-invalid': Boolean(errors[fieldName]),
    'aria-describedby': errors[fieldName] ? `${fieldName}-error` : undefined,
  };
}

export default function RequestForm({ onAddRequest }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setFeedback('กรุณาตรวจข้อมูลที่ระบุ');
      return;
    }

    setIsSubmitting(true);
    setFeedback('กำลังบันทึกคำร้อง…');
    try {
      await onAddRequest(form);
      setForm(EMPTY_FORM);
      setFeedback('บันทึกคำร้องแล้ว');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'บันทึกคำร้องไม่สำเร็จ');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form data-testid="request-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
        <input
          id="requesterName"
          name="requesterName"
          value={form.requesterName}
          onChange={handleChange}
          {...fieldA11y('requesterName', errors)}
        />
        <FieldError id="requesterName-error" message={errors.requesterName} />
      </div>

      <div className="field">
        <label htmlFor="requestType">ประเภทคำร้อง</label>
        <select
          id="requestType"
          name="requestType"
          value={form.requestType}
          onChange={handleChange}
          {...fieldA11y('requestType', errors)}
        >
          <option value="">-- เลือกประเภท --</option>
          {REQUEST_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <FieldError id="requestType-error" message={errors.requestType} />
      </div>

      <div className="field">
        <label htmlFor="location">สถานที่</label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          {...fieldA11y('location', errors)}
        />
        <FieldError id="location-error" message={errors.location} />
      </div>

      <div className="field">
        <label htmlFor="details">รายละเอียด</label>
        <textarea
          id="details"
          name="details"
          rows="4"
          value={form.details}
          onChange={handleChange}
          {...fieldA11y('details', errors)}
        />
        <FieldError id="details-error" message={errors.details} />
      </div>

      <fieldset className="field">
        <legend>ความเร่งด่วน</legend>
        <label className="radio-label">
          <input type="radio" name="priority" value="normal" checked={form.priority === 'normal'} onChange={handleChange} />
          {' '}ปกติ
        </label>
        <label className="radio-label">
          <input type="radio" name="priority" value="urgent" checked={form.priority === 'urgent'} onChange={handleChange} />
          {' '}เร่งด่วน
        </label>
        <FieldError id="priority-error" message={errors.priority} />
      </fieldset>

      <button className="button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'กำลังบันทึก…' : 'เพิ่มคำร้อง'}
      </button>
      <p className="status" role={feedback.includes('ไม่') ? 'alert' : 'status'}>{feedback}</p>
    </form>
  );
}

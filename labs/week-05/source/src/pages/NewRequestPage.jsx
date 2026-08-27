import { useNavigate } from 'react-router-dom';
import RequestForm from '../components/RequestForm.jsx';
import { addRequest } from '../services/requestService.js';

export default function NewRequestPage() {
  const navigate = useNavigate();

  async function handleAddRequest(formValues) {
    const created = await addRequest(formValues);
    navigate(`/requests/${created.id}`);
  }

  return (
    <section data-testid="page-new-request">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">CONTROLLED FORM</p>
          <h1>สร้างคำร้องใหม่</h1>
          <p>ตรวจข้อมูลก่อนบันทึก ทุกคำร้องใหม่เริ่มต้นที่ pending</p>
        </div>
      </div>
      <section className="panel form-panel">
        <RequestForm onAddRequest={handleAddRequest} />
      </section>
    </section>
  );
}

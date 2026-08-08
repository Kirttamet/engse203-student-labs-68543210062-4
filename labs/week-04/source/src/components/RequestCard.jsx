const statusLabels = {
  pending: 'รอดำเนินการ',
  'in-progress': 'กำลังดำเนินการ',
  completed: 'เสร็จสิ้น',
};

const statusClass = {
  pending: 'status-pending',
  'in-progress': 'status-in-progress',
  completed: 'status-completed',
};

function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="task-card">
      <div>
        <div className="badge-row">
          <span className={`badge ${statusClass[request.status]}`}>
            {statusLabels[request.status]}
          </span>
          {request.priority === 'urgent' && (
            <span className="badge priority-urgent">ด่วน</span>
          )}
        </div>
        <h3>{request.requestType}</h3>
        <p>
          {request.requesterName} · {request.location}
        </p>
        <p>{request.details}</p>
      </div>

      <button
        className="danger-button"
        type="button"
        onClick={() => onDeleteRequest(request.id)}
        aria-label={`ลบคำร้องของ ${request.requesterName}`}
      >
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;

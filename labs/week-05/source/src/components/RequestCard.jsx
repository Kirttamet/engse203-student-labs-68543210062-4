import { Link } from 'react-router-dom';

export default function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p>
          <span className={`badge ${request.status}`}>{request.status}</span> · {request.priority}
        </p>
      </div>
      <button
        type="button"
        className="button danger"
        aria-label={`ลบคำร้อง ${request.id}`}
        onClick={() => onDeleteRequest(request.id)}
      >
        ลบ
      </button>
    </article>
  );
}

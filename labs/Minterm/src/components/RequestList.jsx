import RequestCard from './RequestCard.jsx';

function RequestList({
  requests, onDeleteRequest, onAcknowledge, emptyMessage = 'ไม่มีคำร้องที่ตรงกับตัวกรองนี้',
}) {
  if (requests.length === 0) return <p className="subtle-empty">{emptyMessage}</p>;
  return (
    <div className="request-list" data-testid="request-list">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} onDeleteRequest={onDeleteRequest} onAcknowledge={onAcknowledge} />
      ))}
    </div>
  );
}

export default RequestList;
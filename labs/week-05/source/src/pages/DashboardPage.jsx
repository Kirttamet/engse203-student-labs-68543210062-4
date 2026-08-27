import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { deleteRequest, getRequests, resetRequests } from '../services/requestService.js';

function buildSummary(requests) {
  const summary = { total: requests.length, pending: 0, inProgress: 0, completed: 0 };
  for (const request of requests) {
    if (request.status === 'pending') summary.pending += 1;
    else if (request.status === 'in-progress') summary.inProgress += 1;
    else if (request.status === 'completed') summary.completed += 1;
  }
  return summary;
}

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') ?? '';
  const [reloadKey, reload] = useManualReload();

  const [status, setStatus] = useState('loading');
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let ignore = false;

    setStatus('loading');
    setErrorMessage('');
    setNotice('');

    getRequests({ scenario })
      .then((data) => {
        if (ignore) return;
        setRequests(data);
        setStatus('success');
      })
      .catch((error) => {
        if (ignore) return;
        setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
        setStatus('error');
      });

    return () => {
      ignore = true;
    };
  }, [scenario, reloadKey]);

  const summary = useMemo(() => buildSummary(requests), [requests]);

  const visibleRequests = statusFilter === 'all'
    ? requests
    : requests.filter((request) => request.status === statusFilter);

  function handleRetry() {
    if (scenario) {
      setSearchParams({});
      return;
    }
    reload();
  }

  async function handleDelete(requestId) {
    const remaining = await deleteRequest(requestId);
    setRequests(remaining);
    setNotice(`ลบคำร้อง ${requestId} แล้ว`);
  }

  async function handleReset() {
    const confirmed = window.confirm('คืนค่าข้อมูลตัวอย่างเริ่มต้น และลบคำร้องที่เพิ่มไว้ทั้งหมด?');
    if (!confirmed) return;
    const seedRequests = await resetRequests();
    setRequests(seedRequests);
    setStatusFilter('all');
    setNotice('คืนค่าข้อมูลตัวอย่างเรียบร้อยแล้ว');
  }

  return (
    <section data-testid="page-dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">ROUTED · READ PATH</p>
          <h1>Dashboard</h1>
          <p>ติดตามคำร้องจาก URL และ Service Layer</p>
          <button className="button ghost" data-testid="reset-button" type="button" onClick={handleReset}>
            Reset Demo Data
          </button>
        </div>
      </div>

      {scenario && <p className="lab-scenario" role="status">LAB test scenario: {scenario}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}

      {status === 'loading' && <LoadingState />}
      {status === 'error' && <ErrorState message={errorMessage} onRetry={handleRetry} />}

      {status === 'success' && requests.length === 0 && (
        <section className="state-card" data-testid="empty-state">
          <h2>ยังไม่มีคำร้อง</h2>
          <p>เริ่มสร้างคำร้องแรกของคุณได้เลย</p>
          <Link className="button primary inline" to="/requests/new">สร้างคำร้องใหม่</Link>
        </section>
      )}

      {status === 'success' && requests.length > 0 && (
        <>
          <SummaryPanel summary={summary} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            </div>
            <RequestList requests={visibleRequests} onDeleteRequest={handleDelete} />
          </section>
        </>
      )}
    </section>
  );
}

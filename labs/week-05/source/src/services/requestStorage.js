export const STORAGE_KEY = 'engse203-campus-requests-v1';
export const SCHEMA_VERSION = 1;

const VALID_PRIORITIES = new Set(['normal', 'urgent']);
const VALID_STATUSES = new Set(['pending', 'in-progress', 'completed']);

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidRequest(request) {
  if (!request) return false;
  if (!hasText(request.id) || !request.id.startsWith('REQ-')) return false;
  if (typeof request.requesterName !== 'string' || request.requesterName.trim().length < 2) return false;
  if (!hasText(request.requestType)) return false;
  if (!hasText(request.location)) return false;
  if (typeof request.details !== 'string' || request.details.trim().length < 10) return false;
  if (!VALID_PRIORITIES.has(request.priority)) return false;
  if (!VALID_STATUSES.has(request.status)) return false;
  return true;
}

function hasUniqueIds(requests) {
  return new Set(requests.map((request) => request.id)).size === requests.length;
}

function isValidRequestList(requests) {
  return Array.isArray(requests) && requests.every(isValidRequest) && hasUniqueIds(requests);
}

export function readStoredRequests() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return { status: 'missing' };
  }

  let envelope;
  try {
    envelope = JSON.parse(raw);
  } catch {
    return { status: 'invalid', reason: 'ข้อมูลที่บันทึกไว้ไม่ใช่ JSON ที่อ่านได้' };
  }

  if (envelope?.schemaVersion !== SCHEMA_VERSION) {
    return { status: 'invalid', reason: 'เวอร์ชันของข้อมูลที่บันทึกไว้ไม่ตรงกับระบบปัจจุบัน' };
  }

  if (!isValidRequestList(envelope.requests)) {
    return { status: 'invalid', reason: 'รายการคำร้องที่บันทึกไว้ไม่ตรงตามรูปแบบที่กำหนด' };
  }

  return { status: 'valid', requests: structuredClone(envelope.requests) };
}

export function writeStoredRequests(requests) {
  if (!isValidRequestList(requests)) {
    throw new Error('ไม่สามารถบันทึกข้อมูลคำร้องที่ไม่ตรง schema ได้');
  }

  const envelope = {
    schemaVersion: SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    requests: structuredClone(requests),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
}

export function clearStoredRequests() {
  localStorage.removeItem(STORAGE_KEY);
}

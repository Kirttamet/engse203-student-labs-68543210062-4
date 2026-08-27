import {
  clearStoredRequests,
  readStoredRequests,
  writeStoredRequests,
} from './requestStorage.js';

const SIMULATED_LATENCY_MS = 420;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulateNetworkLatency() {
  const skip = globalThis.__ENGSE203_SKIP_DELAY__;
  await wait(skip ? 0 : SIMULATED_LATENCY_MS);
}

async function fetchSeedRequests() {
  const baseUrl = import.meta.env?.BASE_URL ?? '/';
  const response = await fetch(`${baseUrl}data/initialRequests.json`);
  if (!response.ok) {
    throw new Error('ไม่สามารถโหลดข้อมูลตัวอย่างได้');
  }
  const payload = await response.json();
  return structuredClone(payload);
}

async function loadFromStorageOrSeed(onRecovery) {
  const stored = readStoredRequests();
  if (stored.status === 'valid') {
    return stored.requests;
  }

  const seedRequests = await fetchSeedRequests();
  writeStoredRequests(seedRequests);

  if (stored.status === 'invalid') {
    onRecovery?.('พบข้อมูลที่บันทึกไว้เสียหาย ระบบได้กู้คืนด้วยข้อมูลเริ่มต้นเรียบร้อยแล้ว');
  }

  return seedRequests;
}

export async function getRequests(options = {}) {
  await simulateNetworkLatency();

  if (options.scenario === 'error') {
    throw new Error('LAB scenario: จำลองการโหลดข้อมูลไม่สำเร็จ');
  }
  if (options.scenario === 'empty') {
    return [];
  }

  return loadFromStorageOrSeed(options.onRecovery);
}

export async function getRequestById(requestId) {
  const requests = await getRequests();
  return requests.find((request) => request.id === requestId) ?? null;
}

function trimmed(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function assertValidRequestInput(input) {
  if (!input) throw new Error('ข้อมูลคำร้องไม่ถูกต้อง');
  if (trimmed(input.requesterName).length < 2) throw new Error('ชื่อผู้แจ้งไม่ถูกต้อง');
  if (!trimmed(input.requestType)) throw new Error('กรุณาเลือกประเภทคำร้อง');
  if (!trimmed(input.location)) throw new Error('กรุณาระบุสถานที่');
  if (trimmed(input.details).length < 10) throw new Error('รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร');
  if (!['normal', 'urgent'].includes(input.priority)) throw new Error('ความเร่งด่วนไม่ถูกต้อง');
}

function nextRequestId(existingRequests) {
  const existingIds = new Set(existingRequests.map((request) => request.id));
  let candidate;
  do {
    const stamp = Date.now().toString(36).toUpperCase();
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    candidate = `REQ-${stamp}-${suffix}`;
  } while (existingIds.has(candidate));
  return candidate;
}

export async function addRequest(requestInput) {
  assertValidRequestInput(requestInput);

  const requests = await getRequests();
  const newRequest = {
    id: nextRequestId(requests),
    requesterName: trimmed(requestInput.requesterName),
    requestType: requestInput.requestType,
    location: trimmed(requestInput.location),
    details: trimmed(requestInput.details),
    priority: requestInput.priority,
    status: 'pending',
  };

  writeStoredRequests([...requests, newRequest]);
  return structuredClone(newRequest);
}

export async function deleteRequest(requestId) {
  const requests = await getRequests();
  const remaining = requests.filter((request) => request.id !== requestId);
  writeStoredRequests(remaining);
  return structuredClone(remaining);
}

export async function resetRequests() {
  clearStoredRequests();
  const seedRequests = await fetchSeedRequests();
  writeStoredRequests(seedRequests);
  return structuredClone(seedRequests);
}

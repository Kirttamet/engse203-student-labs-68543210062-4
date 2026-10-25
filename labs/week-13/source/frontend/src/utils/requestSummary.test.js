import { test, expect } from 'vitest';
import { summarizeRequests } from './requestSummary.js';
test('API status in-progress contributes to dashboard summary', () => {
  expect(summarizeRequests([{status:'pending'},{status:'in-progress'},{status:'completed'}])).toEqual({total:3,pending:1,inProgress:1,completed:1});
});
test('empty dashboard summary', () => { expect(summarizeRequests([])).toEqual({total:0,pending:0,inProgress:0,completed:0}); });

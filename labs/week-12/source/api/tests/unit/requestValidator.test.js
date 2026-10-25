import { describe, test, expect } from 'vitest';
import { validateRequestInput, isValidStatus } from '../../src/validators/requestValidator.js';
const valid = {requesterName:'AB',requestType:'แจ้งซ่อม',location:'C3',details:'1234567890',priority:'normal'};
describe('request boundaries', () => {
 test('valid minimum accepted',()=>expect(validateRequestInput(valid)).toEqual([]));
 test.each([null, undefined, [], 'text', 42])('invalid body %j', body=>expect(validateRequestInput(body).length).toBeGreaterThan(0));
 test.each(['', ' ', 'A'])('short name %j',value=>expect(validateRequestInput({...valid,requesterName:value}).length).toBeGreaterThan(0));
 test('9 details rejected',()=>expect(validateRequestInput({...valid,details:'123456789'}).length).toBeGreaterThan(0));
 test('11 details accepted',()=>expect(validateRequestInput({...valid,details:'12345678901'})).toEqual([]));
 test.each(['requestType','location','priority'])('invalid %s',key=>expect(validateRequestInput({...valid,[key]:' '}).length).toBeGreaterThan(0));
 test.each(['pending','in-progress','completed'])('valid status %s',s=>expect(isValidStatus(s)).toBe(true));
 test.each(['done',null,undefined,42])('invalid status %j',s=>expect(isValidStatus(s)).toBe(false));
});


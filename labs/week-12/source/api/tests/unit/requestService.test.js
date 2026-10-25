import {test, expect, beforeEach} from 'vitest';
import * as service from '../../src/services/requestService.js';
beforeEach(async()=>{await service.loadSeed()});
test('missing records return null',()=>{
 expect(service.findById('REQ-999')).toBeNull();
 expect(service.remove('REQ-999')).toBeNull();
 expect(service.updateStatus('REQ-999','completed')).toBeNull();
});
test('transaction rolls back a newly created user on invalid request type',()=>{
 const before=service.listUsers().length;
 expect(()=>service.create({requesterName:'New transaction user',requestType:'INVALID',location:'A',details:'1234567890',priority:'normal'})).toThrow();
 expect(service.listUsers()).toHaveLength(before);
 expect(service.findAll()).toHaveLength(5);
});
test('existing user is reused on create',()=>{
 const user=service.listUsers()[0]; const before=service.listUsers().length;
 const created=service.create({requesterName:user.name,requestType:'แจ้งซ่อม',location:'A',details:'1234567890',priority:'normal'});
 expect(created.requesterName).toBe(user.name); expect(service.listUsers()).toHaveLength(before);
});
test('filtered requests and user requests keep correct relation',()=>{
 expect(service.listRequestsByUser(999)).toEqual([]);
 expect(service.getDbStatus().connected).toBe(true);
 expect(service.findAll({status:'not-valid'})).toEqual([]);
});

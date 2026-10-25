import {test, expect, vi, beforeEach, afterEach} from 'vitest';
import {apiFetch, getAuthToken, setAuthToken} from './apiClient.js';
beforeEach(()=>{const storage=new Map();vi.stubGlobal('sessionStorage',{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)});});
afterEach(()=>vi.unstubAllGlobals());
test('Bearer token and custom headers both survive caller options',async()=>{
 setAuthToken('test-token'); const mock=vi.fn().mockResolvedValue(new Response(JSON.stringify({ok:true}),{status:200}));vi.stubGlobal('fetch',mock);
 expect(await apiFetch('/api/health',{headers:{'X-Lab':'13'}})).toEqual({ok:true});
 expect(mock.mock.calls[0][1].headers.get('Authorization')).toBe('Bearer test-token');
 expect(mock.mock.calls[0][1].headers.get('X-Lab')).toBe('13');
});
test('401 clears token and gives API message',async()=>{
 setAuthToken('expired');vi.stubGlobal('fetch',vi.fn().mockResolvedValue(new Response(JSON.stringify({error:'expired'}),{status:401})));
 await expect(apiFetch('/api/requests')).rejects.toMatchObject({status:401,message:'expired'});expect(getAuthToken()).toBeNull();
});
test('204 needs no JSON body',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue(new Response(null,{status:204})));expect(await apiFetch('/api/requests/1',{method:'DELETE'})).toBeNull();});
test('network error has status zero',async()=>{vi.stubGlobal('fetch',vi.fn().mockRejectedValue(new Error('offline')));await expect(apiFetch('/api/health')).rejects.toMatchObject({status:0});});

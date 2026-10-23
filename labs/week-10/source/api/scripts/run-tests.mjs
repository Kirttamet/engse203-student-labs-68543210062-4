import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
const files=readdirSync('tests').filter(x=>x.endsWith('.test.js')).map(x=>'tests/'+x);
const r=spawnSync(process.execPath,['--disable-warning=ExperimentalWarning','--test',...files],{stdio:'inherit',env:{...process.env,DB_FILE:':memory:',NODE_ENV:'test'}});
process.exitCode=r.status??1;

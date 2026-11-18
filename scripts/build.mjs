import { cp,mkdir,rm } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=process.cwd(),out=resolve(root,'dist');
if(out!==resolve(root,'dist'))throw new Error('Invalid output');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const path of ['index.html','assets','demos','_headers','robots.txt','sitemap.xml','404.html'])await cp(resolve(root,path),resolve(out,path),{recursive:true});
console.log('Static site built in dist/');

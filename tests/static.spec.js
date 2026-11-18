import {test,expect} from '@playwright/test';
import {HtmlValidate} from 'html-validate';
import {parse} from 'css-tree';
import {readFile} from 'node:fs/promises';
test('HTML e CSS sem erros de análise',async()=>{
 const validator=new HtmlValidate({extends:['html-validate:recommended'],rules:{'void-style':'off','long-title':'off'}});
 for(const name of ['index.html','demos/financeiro.html','demos/loja.html','demos/contabilidade.html','demos/redes.html','404.html']){const r=await validator.validateFile(name);expect(r.results.flatMap(x=>x.messages)).toEqual([]);}
 for(const name of ['assets/style.css','assets/demos.css']){const errors=[];parse(await readFile(name,'utf8'),{onParseError:e=>errors.push(e.message)});expect(errors).toEqual([]);}
});

import {test,expect} from '@playwright/test';
test('financeiro: criar, editar, persistir, filtrar, exportar e excluir',async({page})=>{
 await page.goto('/demos/financeiro.html');await expect(page.locator('#entries tr')).toHaveCount(6);
 await page.getByRole('button',{name:'Novo lançamento',exact:true}).click();
 await page.getByLabel('Descrição',{exact:true}).fill('Projeto de teste');await page.getByLabel('Valor em reais').fill('123.45');await page.getByRole('button',{name:'Salvar lançamento'}).click();
 await expect(page.locator('#entries tr')).toHaveCount(7);await expect(page.locator('#finance-metrics')).toContainText('R$ 7.473,75');
 await page.reload();await expect(page.locator('#entries tr')).toHaveCount(7);
 await page.getByRole('button',{name:'Editar Projeto de teste',exact:true}).click();await page.getByLabel('Valor em reais').fill('200');await page.locator('#entry-form select[name=type]').selectOption('despesa');await page.getByRole('button',{name:'Salvar lançamento'}).click();
 await page.locator('#finance-search').fill('Projeto de teste');await expect(page.locator('#entries tr')).toHaveCount(1);await expect(page.locator('#finance-metrics')).toContainText('-R$ 200,00');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar CSV'}).click();expect((await download).suggestedFilename()).toBe('kodexis-financeiro.csv');
 await page.getByRole('button',{name:'Excluir Projeto de teste',exact:true}).click();await expect(page.locator('#finance-empty')).toBeVisible();await page.getByRole('button',{name:'Limpar filtros',exact:true}).click();await expect(page.locator('#entries tr')).toHaveCount(6);
});
test('loja: categoria, busca, carrinho persistente, cupom e pedido simulado',async({page})=>{
 await page.goto('/demos/loja.html');await expect(page.locator('.product-card')).toHaveCount(8);await page.getByRole('button',{name:'Áudio 2',exact:true}).click();await expect(page.locator('.product-card')).toHaveCount(2);
 await page.getByRole('button',{name:'Adicionar Fone Aura Wireless',exact:true}).click();await expect(page.locator('#cart-count')).toHaveText('1');await page.reload();await expect(page.locator('#cart-count')).toHaveText('1');await page.locator('#open-cart').click();
 await expect(page.locator('#cart-total')).toHaveText('R$ 309,80');await page.getByLabel('Cupom de desconto',{exact:true}).fill('INVALIDO');await page.getByRole('button',{name:'Aplicar',exact:true}).click();await expect(page.locator('#coupon-feedback')).toContainText('inválido');
 await page.getByLabel('Cupom de desconto',{exact:true}).fill('KODEXIS10');await page.getByRole('button',{name:'Aplicar',exact:true}).click();await expect(page.locator('#cart-total')).toHaveText('R$ 280,81');
 await page.getByRole('button',{name:'Aumentar quantidade de Fone Aura Wireless',exact:true}).click();await expect(page.locator('#cart-total')).toHaveText('R$ 521,82');
 await page.getByRole('button',{name:'Concluir pedido de teste'}).click();await expect(page.getByRole('heading',{name:'Experiência concluída.'})).toBeVisible();await expect(page.locator('#cart-count')).toHaveText('0');
});
test('contabilidade: solicitação, anexo local, revisão e persistência',async({page})=>{
 await page.goto('/demos/contabilidade.html');await expect(page.locator('#documents tr')).toHaveCount(6);await page.getByRole('button',{name:'Solicitar documento'}).click();await page.getByLabel('Documento',{exact:true}).fill('Relatório de teste');await page.getByRole('button',{name:'Criar solicitação',exact:true}).click();
 await page.locator('#document-search').fill('Relatório de teste');await expect(page.locator('#documents tr')).toHaveCount(1);await page.getByRole('button',{name:'Sou cliente',exact:true}).click();await expect(page.locator('#new-request')).toBeHidden();await page.getByRole('button',{name:'Anexar arquivo',exact:true}).click();
 await page.locator('input[type=file]').setInputFiles({name:'arquivo-ficticio.txt',mimeType:'text/plain',buffer:Buffer.from('Demonstração sem dados reais')});await page.getByRole('button',{name:'Anexar na demonstração',exact:true}).click();await expect(page.locator('#documents')).toContainText('Recebido');
 await page.getByRole('button',{name:'Sou contador',exact:true}).click();await page.getByRole('button',{name:'Concluir revisão',exact:true}).click();await expect(page.locator('#documents')).toContainText('Concluído');await page.reload();await page.locator('#document-search').fill('Relatório de teste');await expect(page.locator('#documents')).toContainText('Concluído');await expect(page.locator('#documents')).toContainText('arquivo-ficticio.txt');
});
test('redes: cenários alteram o diagnóstico e comandos não executam entradas arbitrárias',async({page})=>{
 await page.goto('/demos/redes.html');await page.getByRole('button',{name:'Executar diagnóstico',exact:true}).click();await expect(page.locator('#terminal-output')).toContainText('comunicação operacional');await expect(page.locator('#run-diagnostics')).toBeEnabled();
 await page.locator('#network-scenario').selectOption('falha');await expect(page.locator('[data-node=server]')).toHaveClass(/offline/);await page.getByRole('button',{name:'ping servidor',exact:true}).click();await expect(page.locator('#terminal-output')).toContainText('100% de perda simulada');await expect(page.locator('#run-diagnostics')).toBeEnabled();
 await page.locator('#network-scenario').selectOption('latencia');await page.getByRole('button',{name:'Executar diagnóstico',exact:true}).click();await expect(page.locator('#terminal-output')).toContainText('186 ms');await expect(page.locator('#run-diagnostics')).toBeEnabled();await page.locator('#terminal-input').fill('<img src=x onerror=alert(1)>');await page.locator('#terminal-form button').click();await expect(page.locator('#terminal-output img')).toHaveCount(0);
 await page.getByRole('button',{name:'limpar terminal',exact:true}).click();await expect(page.locator('#terminal-output')).toHaveText('');
});
for(const width of [1440,768,390,320])test(`todas as páginas: layout e console em ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 for(const path of ['/','/demos/financeiro.html','/demos/loja.html','/demos/contabilidade.html','/demos/redes.html']){await page.goto(path);if(path!=='/')await expect(page.locator('#app h1')).toBeVisible();else await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);expect(await page.evaluate(()=>[...document.images].some(i=>i.complete&&!i.naturalWidth))).toBe(false);}
 expect(errors).toEqual([]);
});

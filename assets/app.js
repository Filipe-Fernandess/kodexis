import {icon,hydrateIcons} from './ui.js';
const configs={financeiro:{name:'Fluxo',icon:'wallet',notice:'Demonstração interativa · Dados fictícios salvos apenas neste navegador.'},loja:{name:'FORMA/',icon:'bag',notice:'Loja demonstrativa · Produtos e preços fictícios. Nenhuma compra ou cobrança real.'},contabilidade:{name:'ContaHub',icon:'file',notice:'Portal demonstrativo · A troca de visão não é um login. Use apenas arquivos fictícios; nada é enviado a um servidor.'},redes:{name:'NetLab',icon:'network',notice:'Simulação educacional · Não acessa, varre ou altera sua rede. IPs e resultados são fictícios.'}};
const app=document.body.dataset.app;const config=configs[app];
document.querySelector('#demo-header').innerHTML=`<div class="demo-header-inner"><a class="back-link" href="../index.html#laboratorio">← <span>Voltar à Kodexis</span></a><div class="demo-brand"><span>${icon(config.icon)}</span>${config.name}</div><span class="demo-badge"><span class="live-dot"></span> DEMONSTRAÇÃO</span></div>`;
document.querySelector('#demo-notice').textContent=config.notice;
document.querySelector('#demo-footer').innerHTML=`<span>Laboratório Kodexis · Explore, teste e imagine seu projeto.</span><a href="../index.html#contato">Gostou da ideia? Vamos conversar ↗</a>`;
const {mount}=await import(`./${app}.js`);
mount(document.querySelector('#app'));
hydrateIcons();

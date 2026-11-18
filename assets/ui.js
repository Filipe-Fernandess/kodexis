export const icons = {
  code:'<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-12-2 16"/>',
  layers:'<path d="m12 3 10 6-10 6L2 9l10-6Zm-10 12 10 6 10-6M2 12l10 6 10-6"/>',
  network:'<rect x="8" y="3" width="8" height="6" rx="1"/><rect x="2" y="16" width="7" height="5" rx="1"/><rect x="15" y="16" width="7" height="5" rx="1"/><path d="M12 9v4H5v3m7-3h7v3"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
  bag:'<path d="M5 7h14l2 14H3L5 7Zm3 0V6a4 4 0 0 1 8 0v1"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  plus:'<path d="M12 4v16M4 12h16"/>',
  trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  edit:'<path d="m14 5 5 5M4 20l5-1L21 7l-5-5L4 14v6Z"/>',
  wallet:'<path d="M20 8V4H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16V8H4a2 2 0 0 1 0-4m12 10h6v4h-6z"/>',
  file:'<path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 13h8m-8 4h6"/>',
  check:'<path d="m5 12 4 4L20 5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  reset:'<path d="M3 10a9 9 0 1 1 1 8M3 3v7h7"/>',
  terminal:'<path d="m5 6 6 6-6 6m8 0h7"/>',
};
export function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.code}</svg>`;}
const artPaths={
 headphones:'<path d="M30 61V45a30 30 0 0 1 60 0v16M33 52h10v33H33a8 8 0 0 1-8-8V60a8 8 0 0 1 8-8Zm54 0H77v33h10a8 8 0 0 0 8-8V60a8 8 0 0 0-8-8Z"/><path d="M43 28a24 24 0 0 1 34 0"/>',
 lamp:'<path d="M42 97h45M62 97V56m-15 0h44L76 24H62L47 56ZM76 24l10-8m-2 40-4 7"/>',
 keyboard:'<rect x="17" y="42" width="87" height="42" rx="5"/><path d="M24 52h72M24 62h72M24 72h13m10 0h30m10 0h9M31 49v16m12-16v16m12-16v16m12-16v16m12-16v16m12-16v16"/>',
 mouse:'<path d="M60 20c-18 0-28 16-28 36v16c0 18 10 30 28 30s28-12 28-30V56c0-20-10-36-28-36Zm0 0v36M33 56h54"/><rect x="57" y="33" width="6" height="13" rx="3"/>',
 speaker:'<rect x="32" y="17" width="56" height="88" rx="8"/><circle cx="60" cy="71" r="18"/><circle cx="60" cy="37" r="7"/><path d="M44 95h32"/>',
 notebook:'<path d="M28 19h62v83H28a7 7 0 0 1-7-7V26a7 7 0 0 1 7-7Zm4 0v83M43 40h35m-35 12h35m-35 12h23"/>',
 hub:'<rect x="16" y="46" width="88" height="32" rx="7"/><path d="M31 46V30h24V16M28 57h12v10H28Zm24 0h12v10H52Zm24 0h12v10H76Z"/>',
 stand:'<path d="m22 49 65-23 15 11-66 24-14-12Zm26 10 7 29m24-40 8 25-32 15-13-6m8 9-15 8h51l-9-13"/>'
};
export function productArt(type){return `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${artPaths[type]||artPaths.notebook}</svg>`;}
export function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export const money=(cents)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
export function readStore(key,fallback){try {const x=localStorage.getItem('kodexis:'+key);return x?JSON.parse(x):structuredClone(fallback);}catch{return structuredClone(fallback);}}
export function saveStore(key,value){try{localStorage.setItem('kodexis:'+key,JSON.stringify(value));return true;}catch{toast('O navegador não permitiu salvar. Você pode continuar nesta sessão.');return false;}}
export function toast(message){let el=document.querySelector('#toast');if(!el){el=document.createElement('div');el.id='toast';el.setAttribute('role','status');el.className='toast';document.body.append(el);}el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),4000);}
export function hydrateIcons(){document.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=icon(e.dataset.icon));document.querySelectorAll('[data-product-art]').forEach(e=>e.innerHTML=productArt(e.dataset.productArt));}
export function dateLabel(value){return new Date(value+'T12:00:00').toLocaleDateString('pt-BR');}
export function localDate(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function download(name,text,type='text/csv;charset=utf-8'){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export function wireDialog(dialog){dialog.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});}

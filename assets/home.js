import {hydrateIcons} from './ui.js';
hydrateIcons();
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}});},{threshold:.08});document.querySelectorAll('.section-heading,.service-grid,.project-card,.about,.contact-panel').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}

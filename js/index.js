
const header=document.querySelector('.site-header');
const onScroll=()=>header&&header.classList.toggle('scrolled',scrollY>28); onScroll(); addEventListener('scroll',onScroll,{passive:true});
const burger=document.querySelector('.hamb'), mobile=document.querySelector('.mobile-nav');
function closeMenu(){mobile?.classList.remove('open');document.body.classList.remove('menu-open');burger?.setAttribute('aria-expanded','false');burger?.setAttribute('aria-label','Open navigation')}
function openMenu(){mobile?.classList.add('open');document.body.classList.add('menu-open');burger?.setAttribute('aria-expanded','true');burger?.setAttribute('aria-label','Close navigation')}
burger?.addEventListener('click',()=>mobile?.classList.contains('open')?closeMenu():openMenu());
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

// Accessible gallery lightbox: keyboard open, focus trap, Escape, and focus restore.
const lb=document.querySelector('.lightbox');
let lastLightboxTrigger=null;
const lbButton=lb?.querySelector('button');
const lbImg=lb?.querySelector('img');
function openLightbox(trigger){if(!lb||!lbImg)return; const img=trigger.querySelector('img'); if(!img)return; lastLightboxTrigger=trigger; lbImg.src=img.src; lbImg.alt=img.alt; lb.hidden=false; lb.classList.add('open'); document.body.classList.add('menu-open'); lbButton?.focus();}
function closeLightbox(){if(!lb)return; lb.classList.remove('open'); lb.hidden=true; document.body.classList.remove('menu-open'); lastLightboxTrigger?.focus();}
document.querySelectorAll('[data-lightbox]').forEach(el=>{el.addEventListener('click',()=>openLightbox(el));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(el)}})});
lbButton?.addEventListener('click',closeLightbox);
lb?.addEventListener('click',e=>{if(e.target===lb)closeLightbox()});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ if(lb?.classList.contains('open')) closeLightbox(); else closeMenu(); }
  if(e.key==='Tab'&&lb?.classList.contains('open')){ e.preventDefault(); lbButton?.focus(); }
});

// Front-end inquiry helper. Keeps the flow useful until the production form endpoint is connected.
const inquiryForm=document.querySelector('[data-inquiry-form]');
inquiryForm?.addEventListener('submit',e=>{e.preventDefault();const status=inquiryForm.querySelector('.form-status');if(status)status.textContent='Thank you. Please call Oaklawn at 731-407-4262 to complete your inquiry while this form is connected to the restaurant’s production form service.';});

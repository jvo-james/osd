
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

// Menu search: filters individual items while preserving section context.
const menuSearch=document.querySelector('[data-menu-search]');
const menuClear=document.querySelector('[data-menu-clear]');
const searchStatus=document.querySelector('[data-search-status]');
function normalizeMenuText(v=''){return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim()}
function runMenuSearch(){
  const q=normalizeMenuText(menuSearch?.value||'');
  let matches=0;
  document.querySelectorAll('.menu-section').forEach(section=>{
    let sectionMatches=0;
    section.querySelectorAll('.menu-group').forEach(group=>{
      let groupMatches=0;
      group.querySelectorAll('.menu-item').forEach(item=>{
        const hit=!q||normalizeMenuText(item.textContent).includes(q);
        item.hidden=!hit;
        if(hit){matches++;groupMatches++;sectionMatches++}
      });
      group.classList.toggle('search-empty',!!q&&groupMatches===0);
    });
    section.classList.toggle('search-empty',!!q&&sectionMatches===0);
    section.classList.toggle('search-match',!!q&&sectionMatches>0);
  });
  if(menuClear) menuClear.hidden=!q;
  if(searchStatus) searchStatus.textContent=q?(matches?`${matches} menu item${matches===1?'':'s'} found for “${menuSearch.value.trim()}”.`:`No matches for “${menuSearch.value.trim()}”. Try an ingredient, spirit or dish name.`):'';
}
menuSearch?.addEventListener('input',runMenuSearch);
menuClear?.addEventListener('click',()=>{menuSearch.value='';runMenuSearch();menuSearch.focus()});

const header=document.querySelector('.site-header');
const onScroll=()=>header&&header.classList.toggle('scrolled',scrollY>28); onScroll(); addEventListener('scroll',onScroll,{passive:true});
const burger=document.querySelector('.hamb'), mobile=document.querySelector('.mobile-nav');
function closeMenu(){mobile?.classList.remove('open');document.body.classList.remove('menu-open');burger?.setAttribute('aria-expanded','false');burger?.setAttribute('aria-label','Open navigation')}
function openMenu(){mobile?.classList.add('open');document.body.classList.add('menu-open');burger?.setAttribute('aria-expanded','true');burger?.setAttribute('aria-label','Close navigation')}
burger?.addEventListener('click',()=>mobile?.classList.contains('open')?closeMenu():openMenu());
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

// Gallery viewer: keyboard, previous/next, counter, caption, swipe, focus restore.
const viewer=document.querySelector('.lightbox');
const items=[...document.querySelectorAll('[data-lightbox]')];
const viewerImage=viewer?.querySelector('img');
const viewerCaption=viewer?.querySelector('[data-lightbox-caption]');
const viewerCount=viewer?.querySelector('[data-lightbox-count]');
const viewerClose=viewer?.querySelector('.lightbox-close');
const viewerPrev=viewer?.querySelector('.prev');
const viewerNext=viewer?.querySelector('.next');
let current=0, origin=null, pointerStart=0;
function renderPhoto(index){
  if(!items.length||!viewerImage)return;
  current=(index+items.length)%items.length;
  const img=items[current].querySelector('img');
  viewerImage.src=img.currentSrc||img.src;
  viewerImage.alt=img.alt;
  if(viewerCaption)viewerCaption.textContent=img.alt;
  if(viewerCount)viewerCount.textContent=`${String(current+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
}
function openViewer(item){
  if(!viewer)return;
  origin=item; renderPhoto(items.indexOf(item));
  viewer.hidden=false; viewer.classList.add('open'); document.body.classList.add('menu-open'); viewerClose?.focus();
}
function closeViewer(){
  if(!viewer)return;
  viewer.classList.remove('open'); viewer.hidden=true; document.body.classList.remove('menu-open'); origin?.focus();
}
items.forEach(item=>{
  item.addEventListener('click',()=>openViewer(item));
  item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openViewer(item)}});
});
viewerClose?.addEventListener('click',closeViewer);
viewerPrev?.addEventListener('click',()=>renderPhoto(current-1));
viewerNext?.addEventListener('click',()=>renderPhoto(current+1));
viewer?.addEventListener('click',e=>{if(e.target===viewer)closeViewer()});
viewer?.addEventListener('pointerdown',e=>{pointerStart=e.clientX});
viewer?.addEventListener('pointerup',e=>{const dx=e.clientX-pointerStart;if(Math.abs(dx)>55)renderPhoto(current+(dx<0?1:-1))});
document.addEventListener('keydown',e=>{
  if(viewer?.classList.contains('open')){
    if(e.key==='Escape'){e.preventDefault();closeViewer()}
    if(e.key==='ArrowLeft'){e.preventDefault();renderPhoto(current-1)}
    if(e.key==='ArrowRight'){e.preventDefault();renderPhoto(current+1)}
    if(e.key==='Tab'){
      const controls=[viewerClose,viewerPrev,viewerNext].filter(Boolean);
      const i=controls.indexOf(document.activeElement);
      if(e.shiftKey&&i<=0){e.preventDefault();controls.at(-1)?.focus()}
      else if(!e.shiftKey&&i===controls.length-1){e.preventDefault();controls[0]?.focus()}
    }
  }else if(e.key==='Escape') closeMenu();
});

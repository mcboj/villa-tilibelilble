(() => {
'use strict';
const $=(selector,parent=document)=>parent.querySelector(selector);
const $$=(selector,parent=document)=>[...parent.querySelectorAll(selector)];
const labels=window.villaMessages || {};
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let reduceOverride=false;
const prefersLessMotion=()=>reduced.matches||reduceOverride;
const desktop=window.matchMedia('(min-width: 761px)');
const cinemaScreen=window.matchMedia('(min-width: 1000px) and (min-height: 700px)');
const clamp=value=>Math.min(1,Math.max(0,value));
const header=$('#site-header');
const menu=$('#menu-toggle');
const nav=$('#main-nav');
function closeMenu(focus=false){
 header.removeAttribute('data-menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',labels.menuOpen);
 if(focus)menu.focus();
}
menu.hidden=false;
menu.addEventListener('click',()=>{
 const open=menu.getAttribute('aria-expanded')!=='true';
 header.toggleAttribute('data-menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?labels.menuClose:labels.menuOpen);
});
$$('a',nav).forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('pointerdown',event=>{if(!header.contains(event.target))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&header.hasAttribute('data-menu-open'))closeMenu(true);});
desktop.addEventListener('change',()=>closeMenu());

// Progressive enhancement: the static articles remain the fallback for every scene.
const visit=$('#visite');
const scenes=$$('.visit-scene');
let sceneAnimations=[];
let ambience=[];
let activeScene=-1;
let cinematic=false;
function scrub(element,frames){
 const animation=element.animate(frames,{duration:1000,fill:'both',easing:'linear'});
 animation.pause();animation.currentTime=0;return animation;
}
function activateScene(index){
 if(index===activeScene)return;activeScene=index;
 scenes.forEach((scene,i)=>{
  const selected=i===index;
  scene.toggleAttribute('data-active',selected);
  scene.inert=!selected;
  scene.setAttribute('aria-hidden',String(!selected));
  const button=$(`[data-scene="${i}"]`);if(button)button.setAttribute('aria-pressed',String(selected));
 });
}
function configureMotion(){
 sceneAnimations.forEach(({mask,zoom})=>{mask?.cancel();zoom.cancel();});
 ambience.forEach(({animation})=>animation.cancel());
 sceneAnimations=[];ambience=[];activeScene=-1;
 cinematic=cinemaScreen.matches&&!prefersLessMotion()&&typeof Element.prototype.animate==='function'&&'inert' in HTMLElement.prototype;
 visit.classList.toggle('is-cinematic',cinematic);
 scenes.forEach(scene=>{scene.inert=false;scene.removeAttribute('aria-hidden');scene.removeAttribute('data-active');});
 if(cinematic){
  sceneAnimations=scenes.map((scene,i)=>({
   mask:i? scrub($('.scene-visual',scene),[{clipPath:'inset(0 0 0 100%)'},{clipPath:'inset(0 0 0 0%)'}]):null,
   zoom:scrub($('img',scene),[{transform:'scale(1.035)'},{transform:'scale(1)'}])
  }));
  activateScene(0);
  ambience.push({element:$('.hero'),type:'hero',animation:scrub($('.hero-photo'),[{transform:'translateY(0)',clipPath:'inset(0 0% 0 0%)'},{transform:'translateY(65px)',clipPath:'inset(0 3% 3% 3%)'}])});
  $$('[data-parallax]').forEach(element=>ambience.push({element,type:'garden',animation:scrub($('img',element),[{transform:'translateY(-7%)'},{transform:'translateY(-1%)'}])}));
 }
 updateScroll();
}
let scheduled=false;
function updateScroll(){
 if(scheduled)return;scheduled=true;
 requestAnimationFrame(()=>{
  scheduled=false;
  header.classList.toggle('is-scrolled',window.scrollY>30);
  const extent=document.documentElement.scrollHeight-window.innerHeight;
  $('.reading-progress').value=extent>0?clamp(window.scrollY/extent):0;
  if(cinematic){
   const rect=visit.getBoundingClientRect();
   const stage=$('.visit-stage').getBoundingClientRect();
   const progress=clamp((105-rect.top)/Math.max(1,rect.height-stage.height));
   sceneAnimations.forEach(({mask,zoom},i)=>{
    if(mask) mask.currentTime=clamp((progress-i/3+.07)/.14)*1000;
    zoom.currentTime=clamp(progress*3-i)*1000;
   });
   activateScene(Math.min(scenes.length-1,Math.floor(progress*scenes.length)));
   ambience.forEach(({element,type,animation})=>{
    const bounds=element.getBoundingClientRect();
    const value=type==='hero'?clamp(-bounds.top/bounds.height):clamp((window.innerHeight-bounds.top)/(window.innerHeight+bounds.height));
    animation.currentTime=value*1000;
   });
  }
 });
}
window.addEventListener('scroll',updateScroll,{passive:true});
window.addEventListener('resize',updateScroll,{passive:true});
reduced.addEventListener('change',configureMotion);
desktop.addEventListener('change',configureMotion);
cinemaScreen.addEventListener('change',configureMotion);
configureMotion();
$$('[data-scene]').forEach(button=>button.addEventListener('click',()=>{
 const index=Number(button.dataset.scene);
 const top=visit.getBoundingClientRect().top+window.scrollY-105;
 const distance=visit.offsetHeight-$('.visit-stage').offsetHeight;
 window.scrollTo({top:top+distance*(index+.5)/scenes.length,behavior:prefersLessMotion()?'instant':'smooth'});
}));

const runningReveals=new Set();
if('IntersectionObserver' in window){
 const reveal=new IntersectionObserver((entries,observer)=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;observer.unobserve(entry.target);
   if(prefersLessMotion() || !entry.target.animate)return;
   const visual=entry.target.matches('.bedroom-card,.bath-photos,.destination-main,.destination-side');
   const frames=visual?[{opacity:.55,clipPath:'inset(8% 0 0 0)',transform:'translateY(22px)'},{opacity:1,clipPath:'inset(0 0 0 0)',transform:'translateY(0)'}]:[{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}];
   const animation=entry.target.animate(frames,{duration:visual?1050:800,easing:'cubic-bezier(.2,.65,.25,1)'});
   runningReveals.add(animation);animation.finished.then(()=>runningReveals.delete(animation)).catch(()=>{});
  });
 },{threshold:.12});
 $$('[data-reveal]').forEach(node=>reveal.observe(node));
 reduced.addEventListener('change',()=>{if(prefersLessMotion()){runningReveals.forEach(a=>a.cancel());runningReveals.clear();}});
 const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(!entry.isIntersecting)return;
   $$('a',nav).forEach(link=>{if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  });
 },{rootMargin:'-15% 0px -60% 0px'});
 ['visite','chambres','alentours','sejour'].forEach(id=>sectionObserver.observe(document.getElementById(id)));
 let heroVisible=true,bookingVisible=false;
 const mobile=()=>{$('#mobile-booking').hidden=heroVisible||bookingVisible;};
 const heroObserver=new IntersectionObserver(([entry])=>{heroVisible=entry.isIntersecting;mobile();});heroObserver.observe($('#accueil'));
 const bookingObserver=new IntersectionObserver(([entry])=>{bookingVisible=entry.isIntersecting;mobile();},{threshold:.2});bookingObserver.observe($('#reserver'));
}

const motionButton=$('#motion-toggle');
if(motionButton){
 const syncMotionButton=()=>{motionButton.hidden=reduced.matches;};
 syncMotionButton();reduced.addEventListener('change',syncMotionButton);
 motionButton.addEventListener('click',()=>{
  const anchor=motionButton.getBoundingClientRect().top+window.scrollY;
  reduceOverride=!reduceOverride;
  document.documentElement.classList.toggle('motion-reduced',reduceOverride);
  motionButton.setAttribute('aria-pressed',String(reduceOverride));
  runningReveals.forEach(animation=>animation.cancel());runningReveals.clear();
  configureMotion();
  // Preserve the user's location when the pinned sequence changes its height.
  const shift=motionButton.getBoundingClientRect().top+window.scrollY-anchor;
  window.scrollBy({top:shift,behavior:'instant'});
 });
}

// Only authored, same-origin image paths can reach the full-size viewer.
const localImage=value=>{
 if(typeof value!=='string'||!/^(?:\.\.\/)?images\/optimized\/[a-z0-9-]+\.webp$/.test(value))return null;
 const url=new URL(value,document.URL);return url.origin===location.origin?url.href:null;
};
const viewer=$('#photo-viewer');
if(viewer&&typeof viewer.showModal==='function'){
 const albumLinks=$$('.album-grid [data-gallery-image]');
 const slides=albumLinks.map(link=>({src:localImage(link.getAttribute('href')),alt:$('img',link).alt,caption:[...$('figcaption',link.closest('figure')).children].map(node=>node.textContent.trim()).join(' · '),id:link.dataset.mediaId})).filter(s=>s.src);
 let current=0,opener=null;
 const img=$('#viewer-image');
 const display=()=>{
  const slide=slides[current];if(!slide)return;
  img.alt=slide.alt;img.src=slide.src;
  $('#viewer-caption').textContent=slide.caption;
  $('#viewer-counter').textContent=(labels.photoCount||'{current} / {total}').replace('{current}',String(current+1)).replace('{total}',String(slides.length));
 };
 const move=delta=>{current=(current+delta+slides.length)%slides.length;display();};
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[data-gallery-image],a[data-open-gallery]');if(!link)return;
  const index=link.hasAttribute('data-open-gallery')?0:slides.findIndex(s=>s.src===localImage(link.getAttribute('href')));
  if(index<0||viewer.open)return;
  event.preventDefault();opener=link;current=index;display();viewer.showModal();document.body.classList.add('viewer-open');$('#viewer-close').focus();
 });
 $('#viewer-close').addEventListener('click',()=>viewer.close());
 $('#viewer-prev').addEventListener('click',()=>move(-1));$('#viewer-next').addEventListener('click',()=>move(1));
 viewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
  else if(event.key==='Home'){event.preventDefault();current=0;display();}
  else if(event.key==='End'){event.preventDefault();current=slides.length-1;display();}
 });
 viewer.addEventListener('click',event=>{if(event.target!==viewer)return;const rect=viewer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)viewer.close();});
 viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');if(opener?.isConnected)opener.focus({preventScroll:true});});
 img.addEventListener('error',()=>{$('#viewer-caption').textContent=labels.imageError;});
 // Horizontal swipes complement buttons and keyboard. Pinch and vertical gestures remain native.
 let pointer=null;
 const picture=$('#viewer-picture');
 picture.addEventListener('pointerdown',event=>{if(event.isPrimary&&event.pointerType!=='mouse')pointer={id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now()};});
 picture.addEventListener('pointerup',event=>{
  if(!pointer||pointer.id!==event.pointerId)return;
  const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y,elapsed=performance.now()-pointer.time;pointer=null;
  if(elapsed<900&&Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);
 });
 picture.addEventListener('pointercancel',()=>{pointer=null;});
 picture.addEventListener('pointerdown',event=>{if(!event.isPrimary)pointer=null;});
}
document.body.classList.add('enhanced');
})();

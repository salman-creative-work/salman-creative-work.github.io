(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const data=window.PORTFOLIO_DATA;
  const rows=Object.values(data).filter(Array.isArray).flat();
  const ids=['gamestore','ayat-magic','recurring-numbers'];
  const tabs=Array.from(document.querySelectorAll('[data-proof]'));
  let chosen=ids[0];
  function render(){
    const lang=document.documentElement.lang==='en'?'en':'ar',suffix=lang==='en'?'En':'Ar';
    const w=rows.find(x=>x.id===chosen); if(!w)return;
    $('proof-poster').src=w.image;$('proof-poster').alt=w[lang];
    $('proof-title').textContent=w[lang];
    $('proof-number').textContent=String(ids.indexOf(chosen)+1).padStart(2,'0')+' / 03';
    $('proof-kind').textContent=w['kind'+suffix]||(lang==='ar'?'مشهد قصصي وأداء شخصيات':'STORY SCENE & CHARACTER PERFORMANCE');
    $('proof-idea').textContent=w['idea'+suffix]||'';
    $('proof-detail').textContent=chosen==='recurring-numbers'?w['description'+suffix]:w['detail'+suffix];
    $('proof-role').textContent=w['role'+suffix]||'';
    $('proof-credit').textContent=chosen==='recurring-numbers'?w['detail'+suffix]:(w['note'+suffix]||'');
    $('proof-watch').dataset.work=chosen;
    $('proof-panel').setAttribute('aria-labelledby','proof-tab-'+chosen);
    for(const tab of tabs){const selected=tab.dataset.proof===chosen;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{chosen=tab.dataset.proof;render();});
    tab.addEventListener('keydown',e=>{
      let next;if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;
      else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        const rtl=document.documentElement.dir==='rtl';
        next=(index+((e.key==='ArrowRight')!==rtl?1:-1)+tabs.length)%tabs.length;
      }else return;
      e.preventDefault();chosen=tabs[next].dataset.proof;render();tabs[next].focus();
    });
  });
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
})();

document.addEventListener('click',e=>{const a=e.target.closest('a[data-wa-ar]');if(!a)return;const t=document.documentElement.lang==='en'?a.dataset.waEn:a.dataset.waAr;a.href='https://wa.me/96569975288?text='+encodeURIComponent(t);});

/* ===== Mobile comfort ===== */
(function(){
  const isEn=()=>document.documentElement.lang==='en';
  const T=(ar,en)=>isEn()?en:ar;
  const nav=document.querySelector('.site-nav'), inner=nav&&nav.querySelector('.nav-inner'), lang=document.getElementById('language');
  let btn;
  if(inner&&lang){
    btn=document.createElement('button');btn.type='button';btn.className='m-menu-btn';btn.setAttribute('aria-expanded','false');btn.innerHTML='☰';
    inner.insertBefore(btn,lang);
    const close=()=>{nav.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');btn.innerHTML='☰';};
    btn.addEventListener('click',e=>{e.stopPropagation();const o=nav.classList.toggle('menu-open');btn.setAttribute('aria-expanded',String(o));btn.innerHTML=o?'✕':'☰';});
    nav.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('click',e=>{if(!nav.contains(e.target))close();});
  }
  // swipe hints + dots
  const tracks=[...document.querySelectorAll('.pk-grid,.idea-grid')];
  const hints=tracks.map(tr=>{
    const h=document.createElement('div');h.className='swipe-hint';h.setAttribute('aria-hidden','true');
    const t=document.createElement('span');const d=document.createElement('span');d.className='swipe-dots';
    [...tr.children].forEach(()=>d.appendChild(document.createElement('i')));
    h.append(t,d);tr.parentNode.insertBefore(h,tr);
    const upd=()=>{const items=[...tr.children];const x=tr.getBoundingClientRect();let best=0,bd=1e9;
      items.forEach((c,i)=>{const r=c.getBoundingClientRect();const dd=Math.abs((isEn()?r.left-x.left:x.right-r.right));if(dd<bd){bd=dd;best=i}});
      [...d.children].forEach((dot,i)=>dot.classList.toggle('on',i===best));};
    tr.addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});upd();
    return t;
  });
  // bottom bar
  const bar=document.createElement('div');bar.className='m-bar';
  bar.innerHTML='<a class="m-wa" href="https://wa.me/96569975288" target="_blank" rel="noopener"></a><a class="m-create" href="#create"></a>';
  document.body.appendChild(bar);
  const wa=bar.querySelector('.m-wa'), cr=bar.querySelector('.m-create');
  const paint=()=>{
    hints.forEach(t=>t.textContent=T('اسحب لمشاهدة المزيد ←','Swipe to see more →'));
    wa.textContent=T('واتساب','WhatsApp');cr.textContent=T('دعني أصنع محتواك ✦','Let me create your content ✦');
    wa.href='https://wa.me/96569975288?text='+encodeURIComponent(T('مرحبًا سلمان، وصلت إليك من موقعك وأود التحدث عن: ','Hi Salman, I found you through your website and would like to talk about: '));
    if(btn)btn.setAttribute('aria-label',T('القائمة','Menu'));
  };
  paint();new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  const hero=document.querySelector('.hero'), brief=document.getElementById('brief'), create=document.getElementById('create');
  const vis={hero:true,brief:false,create:false};
  const sync=()=>{bar.classList.toggle('show',!vis.hero&&!vis.brief);cr.style.display=vis.create?'none':'';bar.style.gridTemplateColumns=vis.create?'1fr':'';};
  const io=new IntersectionObserver(es=>{es.forEach(e=>{vis[e.target===hero?'hero':'brief']=e.isIntersecting});sync();},{threshold:0});
  [hero,brief].forEach(el=>el&&io.observe(el));
  if(create)new IntersectionObserver(es=>{es.forEach(e=>{vis.create=e.isIntersecting});sync();},{rootMargin:'-45% 0px -45% 0px'}).observe(create);
})();

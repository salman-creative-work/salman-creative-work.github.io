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

let lang=new URLSearchParams(location.search).get('lang')==='en'?'en':'ar',cinemaFilter='selected',activeWork=0,lastWorkTrigger=null,activeCase=null,skipReturnFocus=false;
const siteOrigin='https://salman-creative-work.github.io/',data=window.PORTFOLIO_DATA,workDialog=document.getElementById('work-dialog');
const tx=(ar,en)=>lang==='ar'?ar:en;
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n};
const collectionData=c=>c==='story'?data.stories:c==='audio'?data.aiAudio:c==='voice'?data.voice:data.cinema;
const caseRef=(collection,id)=>({collection,id});
const findCase=r=>collectionData(r.collection)?.find(w=>w.id===r.id);
const allCases=()=>[...data.cinema.map(w=>caseRef('cinema',w.id)),...data.stories.map(w=>caseRef('story',w.id))];
const caseSequence=()=>['audio','voice'].includes(activeCase?.collection)?collectionData(activeCase.collection).map(w=>caseRef(activeCase.collection,w.id)):allCases();
const featuredCases=[caseRef('cinema','cinderella'),caseRef('cinema','gamestore'),caseRef('cinema','qamar'),caseRef('story','recurring-numbers'),caseRef('story','sylvester-zark')];
const casePresentation={
 cinderella:{category:'beauty',ar:'تجربة تجميل بلغة سينمائية',en:'Beauty, told through cinematic transformation',roleAr:'الإنتاج البصري بالـAI والإخراج والمونتاج تحت هوية أوراكشن.',roleEn:'AI visual production, direction and editing under ORAKTION.'},
 'ayat-magic':{category:'beauty',ar:'إعلان تجميل بشخصية مرحة',en:'A playful, character-led beauty advertisement',roleAr:'تطوير المعالجة الإبداعية والإنتاج بالـAI والمونتاج لإعلان آيات اليحيى.',roleEn:'Creative treatment, AI production and editing for Ayat Al Yahya’s advertisement.'},
 gamestore:{category:'services',ar:'متجر يتحوّل إلى عالم حيّ',en:'A store becomes a living world',roleAr:'الفكرة والإخراج والإنتاج بالـAI والمونتاج ضمن أوراكشن.',roleEn:'Concept, AI direction, production and editing through ORAKTION.'},
 qamar:{category:'services',ar:'فكرة إعلانية لعيادة أسنان',en:'A story-led concept for a dental clinic',badgeAr:'فكرة مستقلة لعيادة متخيّلة',badgeEn:'Self-initiated concept for a fictional clinic',roleAr:'ابتكار الفكرة والإخراج والإنتاج بالـAI والمونتاج ضمن أوراكشن.',roleEn:'Original concept, AI direction, production and editing through ORAKTION.'},
 violet:{category:'beauty',ar:'الأزياء من القطعة إلى تفاصيلها',en:'Fashion, from silhouette to detail'},
 hakawati:{category:'services',ar:'رسالة عائلية تقودها الحكاية',en:'A family message, carried by a story'},
 'recurring-numbers':{category:'worlds',ar:'التفصيل الذي يقود الحكاية',en:'Detail that drives the story',ideaAr:'إشارات متكررة ترافق لارا، وتحوّل الفضول إلى خيط يربط الحكاية.',ideaEn:'Recurring signs follow Lara, turning curiosity into a thread through the story.',useAr:'أسلوب مناسب لتريلر أو حكاية تتدرج في كشف فكرتها؛ يوجّه انتباه المشاهد إلى التفاصيل المقصودة.',useEn:'An approach for a trailer or story that reveals its premise gradually, directing attention to meaningful details.'},
 'sylvester-zark':{category:'worlds',ar:'عالم تتذكّر شخصياته',en:'A fantasy world with distinctive characters',ideaAr:'قط في مواجهة تنين؛ اختلاف الحجم والحضور والصوت هو أساس المشهد.',ideaEn:'A cat confronts a dragon; contrast in scale, presence and voice shapes the encounter.',useAr:'تطوير عالم وشخصيات لحكاية، أو تريلر، أو سلسلة؛ مع مزج الأداء البشري والراوي بالـAI بحسب دور كل صوت.',useEn:'World and character development for stories, trailers or series, combining human character performances with an AI narrator.'}
};
function field(w,key){return w[key+(lang==='ar'?'Ar':'En')]||''}
function presentation(w){return casePresentation[w.id]||{}}
function chosenCases(){
 if(cinemaFilter==='selected')return featuredCases.filter(findCase);
 if(cinemaFilter==='audio')return (data.aiAudio||[]).map(w=>caseRef('audio',w.id));
 if(cinemaFilter==='all')return allCases();
 if(cinemaFilter==='beauty')return ['ayat-magic','cinderella','violet'].map(id=>caseRef('cinema',id)).filter(findCase);
 if(cinemaFilter==='worlds')return [...data.stories.map(w=>caseRef('story',w.id)),...data.cinema.filter(w=>w.type!=='ad').map(w=>caseRef('cinema',w.id))];
 return data.cinema.filter(w=>presentation(w).category===cinemaFilter).map(w=>caseRef('cinema',w.id));
}
function requestCase(ref){if(workDialog.open){skipReturnFocus=true;workDialog.close()}if(window.startProjectFromWork)window.startProjectFromWork(ref)}
function renderCinema(){
 const grid=document.getElementById('cinema-grid');grid.replaceChildren();
 chosenCases().forEach((ref,i)=>{
  const w=findCase(ref);if(!w)return;const p=presentation(w),card=el('article','cinema-card');card.dataset.case=w.id;
  const btn=el('button','work-visual');btn.type='button';btn.setAttribute('aria-label',tx('شاهد ','Watch ')+w[lang]);btn.addEventListener('click',()=>openCase(ref,btn,'watch'));
  const img=el('img');img.src=w.image;img.alt=w[lang];img.loading='lazy';
  btn.append(img,el('span','film-number',String(i+1).padStart(2,'0')+' / ORAKTION'),el('span','watch-label',ref.collection==='audio'?tx('استمع وشاهد','Listen & watch'):tx('شاهد الفيلم','Watch the film')),el('span','play','▶'));
  const tag=el('div','tag',field(w,'kind')||field(w,'focus')||tx('حكاية من أوراكشن','AN ORAKTION STORY')),title=el('h3','',p[lang]||w[lang]),copy=el('p','',field(w,'summary')||field(w,'description'));
  const actions=el('div','case-actions'),details=el('button','case-link',tx('اكتشف الفكرة ↗','Explore the idea ↗')),project=el('button','case-project',tx('هذا الأسلوب لمشروعي','This approach for my project'));
  details.type=project.type='button';details.addEventListener('click',()=>openCase(ref,details,'idea'));project.addEventListener('click',()=>requestCase(ref));
  actions.append(details,project);card.append(btn,tag,title);if(p[lang])card.append(el('p','case-original',w[lang]));if(p.badgeAr)card.append(el('p','concept-badge',field(p,'badge')));card.append(copy,actions);grid.append(card);
 });
 const intro={selected:tx('نماذج مختارة تربط الفكرة باحتياج المشروع. اختر مسارًا لتجد أعمالًا أقرب إلى ما تريد صنعه.','Selected examples connect a creative idea to a project need. Choose a path to find work closer to what you want to make.'),beauty:tx('آيات وسندريلا: معالجتان مختلفتان للتجميل، من الشخصية المرحة إلى التحوّل السينمائي. وتكملها تفاصيل الأزياء.','Ayat and Cinderella bring two approaches to beauty: playful character and cinematic transformation, complemented by fashion detail.'),services:tx('نبدأ بالخدمة وجمهورها، ثم نختار الحكاية التي تجعلها جزءًا من المشهد.','We begin with the service and its audience, then find a story that gives it a role in the scene.'),worlds:tx('شخصيات وحوار وتفاصيل تقود الحكاية؛ من الفانتازيا إلى التريلر والسرد المرئي.','Characters, dialogue and detail that lead a story, from fantasy to trailers and visual narratives.'),audio:tx('أصوات سردية وغناء مُنتَج بالـAI، مع توضيح دور سلمان والأداء البشري في الأعمال المشتركة.','AI-produced narration and singing, with Salman’s role and any human performances clearly credited.'),all:tx('فهرس الأعمال المرئية والحكايات. لكل عمل فكرته ومساهماته وخطوة لبدء مشروعك.','Visual work and stories, each with its concept, contributions and a path to your project.')};
 document.getElementById('collection-note').textContent=intro[cinemaFilter];
 document.querySelectorAll('[data-filter]').forEach(b=>{const on=b.dataset.filter===cinemaFilter;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});
}
function renderSupporting(){if(window.renderCuratedLanguage)window.renderCuratedLanguage()}
function stopDialogMedia(){document.querySelectorAll('#dialog-media video,#dialog-media audio').forEach(v=>v.pause());document.getElementById('dialog-media').replaceChildren()}
function showDialogMode(mode){document.querySelectorAll('[data-case-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.caseMode===mode)));const target=document.getElementById(mode==='idea'?'dialog-title':'dialog-media');target.focus({preventScroll:true});target.scrollIntoView({block:'nearest',behavior:'auto'})}
function renderWork(){
 const w=findCase(activeCase);if(!w)return;const p=presentation(w);
 document.getElementById('dialog-title').textContent=w[lang];document.getElementById('dialog-kind').textContent=p[lang]||field(w,'kind')||field(w,'focus');
 document.getElementById('dialog-idea').textContent=field(p,'idea')||field(w,'idea')||field(w,'description')||field(w,'summary');
 document.getElementById('dialog-detail').textContent=field(w,'detail')||field(w,'focus')||field(w,'description');
 document.getElementById('dialog-use').textContent=field(p,'use')||field(w,'use')||tx('يمكن تطوير معالجة تناسب هدف مشروعك وجمهوره انطلاقًا من هذا الأسلوب.','This approach can inform a treatment tailored to your project’s purpose and audience.');
 document.getElementById('dialog-role').textContent=field(w,'role')||field(p,'role')||field(w,'note');
 document.getElementById('dialog-note').textContent=field(w,'note')||field(w,'credit')||'';
 const badge=document.getElementById('dialog-badge');badge.textContent=field(p,'badge');badge.hidden=!badge.textContent;
 stopDialogMedia();const media=document.getElementById('dialog-media');
 if(w.video||w.audio){const v=el(w.audio?'audio':'video');v.src=w.audio||w.video;if(!w.audio)v.poster=w.image;v.controls=true;v.preload='none';v.playsInline=true;v.setAttribute('aria-label',w[lang]);media.append(v)}
 else if(w.youtubeId){const launch=el('button','youtube-launch'),img=el('img');launch.type='button';img.src=w.image;img.alt=w[lang];launch.append(img,el('span','play','▶'),el('span','youtube-label',tx('تشغيل الفيديو من YouTube','Play video from YouTube')));launch.addEventListener('click',()=>{const frame=el('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(w.youtubeId);frame.title=w[lang];frame.allow='encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';media.replaceChildren(frame)});media.append(launch)}
 else {const img=el('img');img.src=w.image;img.alt=w[lang];media.append(img);if(w.url){const a=el('a','button outline media-external',tx('شاهد الفيلم في المصدر ↗','Watch the film at its source ↗'));a.href=w.url;a.target='_blank';a.rel='noopener';media.append(a)}}
 const outside=document.getElementById('dialog-external');outside.hidden=!w.url;outside.href=w.url||'#';outside.textContent=tx('افتح العمل في مصدره ↗','Open the original work ↗');
 const current=caseSequence(),position=current.findIndex(r=>r.collection===activeCase.collection&&r.id===activeCase.id);document.getElementById('dialog-position').textContent=String(position+1).padStart(2,'0')+' / '+String(current.length).padStart(2,'0');
}
function openCase(ref,trigger,mode='watch'){if(!findCase(ref))return;activeCase=ref;lastWorkTrigger=trigger||document.activeElement;renderWork();if(!workDialog.open)workDialog.showModal();document.body.style.overflow='hidden';showDialogMode(mode)}
function openWork(i,trigger){if(!data.cinema[i])return;activeWork=i;openCase(caseRef('cinema',data.cinema[i].id),trigger)}
window.openPortfolioCase=openCase;
document.querySelectorAll('[data-open-work]').forEach(b=>b.addEventListener('click',()=>openWork(data.cinema.findIndex(w=>w.id===b.dataset.openWork),b)));
document.getElementById('close-work').addEventListener('click',()=>workDialog.close());
workDialog.addEventListener('close',()=>{stopDialogMedia();document.body.style.overflow='';if(!skipReturnFocus&&lastWorkTrigger?.isConnected)lastWorkTrigger.focus({preventScroll:true});skipReturnFocus=false});
workDialog.addEventListener('click',e=>{if(e.target===workDialog){const r=workDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)workDialog.close()}});
function moveCase(delta){const rows=caseSequence(),index=rows.findIndex(r=>r.collection===activeCase.collection&&r.id===activeCase.id);activeCase=rows[(index+delta+rows.length)%rows.length];renderWork()}
document.getElementById('previous-work').addEventListener('click',()=>moveCase(-1));document.getElementById('next-work').addEventListener('click',()=>moveCase(1));
document.querySelectorAll('[data-case-mode]').forEach(b=>b.addEventListener('click',()=>showDialogMode(b.dataset.caseMode)));
document.getElementById('dialog-project').addEventListener('click',()=>requestCase(activeCase));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{cinemaFilter=b.dataset.filter;renderCinema()}));
function setLanguage(){
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('.cv-request').forEach(a=>{a.href='https://wa.me/96569975288?text='+encodeURIComponent(tx('مرحبًا سلمان، أرغب في طلب سيرتك الذاتية.\nالجهة والغرض من الطلب: \nاللغة المفضلة: ','Hi Salman, I would like to request your CV.\nOrganisation and purpose: \nPreferred language: '))});
 document.title='Salman Ghazi Al Husseini | AI Creative Director & Multimedia Creator';document.querySelectorAll('[data-ar]').forEach(n=>{n.innerHTML=n.dataset[lang]});
 const b=document.getElementById('language');b.textContent=tx('EN','عربي');b.setAttribute('aria-label',tx('Switch to English','التبديل إلى العربية'));
 document.querySelectorAll('[data-vision-link]').forEach(a=>{a.href='vision/'+(lang==='en'?'?lang=en':'')});
 renderCinema();renderSupporting();if(window.renderCollaboratorLanguage)window.renderCollaboratorLanguage();if(window.renderService)window.renderService();if(window.renderBriefLanguage)window.renderBriefLanguage();if(workDialog.open)renderWork();
}
document.getElementById('language').addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';setLanguage();const u=new URL(location.href);if(lang==='en')u.searchParams.set('lang','en');else u.searchParams.delete('lang');history.replaceState(null,'',u);document.getElementById('share-status').textContent='';document.getElementById('share-url').hidden=true});
document.addEventListener('click',e=>{const a=e.target.closest('[data-start-brief]');if(a&&window.startCreativeBrief){e.preventDefault();window.startCreativeBrief(a.dataset.startBrief)}});
setLanguage();

(() => {
  'use strict';
  const root = document.getElementById('salman-vision-session');
  const data = window.PORTFOLIO_DATA;
  if (!root || !data) {
    document.querySelector('[data-vs-next]')?.setAttribute('disabled', '');
    return;
  }
  const voiceTypes = {"categories":[{"id":"all","label":["الكل","All"]},{"id":"live","label":["شخصيات بشرية","Live-action characters"]},{"id":"anime","label":["أنمي","Anime"]},{"id":"cartoon","label":["كرتون","Animation"]},{"id":"games","label":["ألعاب","Games"]},{"id":"voiceover","label":["تعليق ومناسبات","Voice-over & occasions"]}],"itemCategory":{"joker":"cartoon","new-year":"voiceover","metal-gear":"games","wallace":"live","smurfs":"cartoon","evangelion":"anime","pocahontas":"cartoon","eren":"anime"},"voiceSource":["أداء بشري بصوت سلمان","Human voice performance by Salman"],"intro":["صوت بشري واحد، بأداء يتغيّر مع الشخصية.","One human voice, a performance shaped by each character."]};
  const chapters = [['الرؤية','Vision'],['احتياجك','Your need'],['عينة العمل','The work'],['قرار الإخراج','The decision'],['نطاق التعاون','The scope'],['طريقة العمل','The process'],['المراجعة','The review'],['عن سلمان','About Salman'],['نقطة البداية','Your brief']];
  const chapterIds = ['vision','need','work','decision','scope','process','review','about','brief'];
  const state = {lang:'ar',scene:0,work:'store',scope:'film',audience:'project',material:'existing',collaborators:false,ownVoices:false,voiceCategory:'all'};
  const drafts = new Map();
  const pick = (ar,en) => state.lang === 'ar' ? ar : en;
  const t = value => value?.[state.lang === 'ar' ? 0 : 1] || '';
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const localAsset = value => typeof value === 'string' && /^assets\/[\w./-]+$/.test(value) ? '../' + value : '';
  const field = (item,key) => item?.[key+(state.lang === 'ar' ? 'Ar' : 'En')] || '';
  const sourceTitle = item => item?.[state.lang] || item?.en || item?.ar || '';
  const libraryLink = anchor => '../' + (state.lang === 'en' ? '?lang=en' : '') + '#' + anchor;
  const whatsapp = text => 'https://wa.me/96569975288?text=' + encodeURIComponent(text);
  const button = (text,attr,primary=false) => `<button type="button" ${attr} class="${primary?'vs-primary':''}">${esc(text)}</button>`;
  const link = (text,url,primary=false) => `<a class="vs-action-link ${primary?'vs-primary':''}" href="${esc(url)}"${/^https?:/.test(url)?' target="_blank" rel="noopener noreferrer"':''}>${esc(text)}</a>`;
  const kicker = text => `<p class="vs-kicker">${esc(text)}</p>`;
  const title = text => `<h1 class="vs-title" id="vs-scene-heading" tabindex="-1">${esc(text)}</h1>`;
  const sub = text => `<p class="vs-sub">${esc(text)}</p>`;
  function order(){ return state.audience === 'hiring' ? [0,7,2,3,8] : [0,1,2,3,4,5,6,7,8]; }
  function readRoute(){
    const params = new URLSearchParams(location.search);
    state.lang = params.get('lang') === 'en' ? 'en' : 'ar';
    state.audience = params.get('audience') === 'hiring' ? 'hiring' : 'project';
    const chapter = chapterIds.indexOf(location.hash.slice(1));
    state.scene = chapter >= 0 ? chapter : 0;
    if (!order().includes(state.scene)) state.scene = 7;
  }
  function writeRoute(){
    const url = new URL(location.href);
    if (state.lang === 'en') url.searchParams.set('lang','en'); else url.searchParams.delete('lang');
    if (state.audience === 'hiring') url.searchParams.set('audience','hiring'); else url.searchParams.delete('audience');
    url.hash = chapterIds[state.scene];
    history.replaceState(null,'',url.pathname+url.search+url.hash);
  }
  readRoute();

  const work={
 store:{title:['بعد الإغلاق','After Closing'],label:['GAMESTORE / إعلان متجر','GAMESTORE / Retail film'],image:'store',idea:['ماذا يحدث للمتجر بعد أن يغلق؟','What happens after the store closes?'],decision:['أصبحت الأرفف والمجسمات جزءًا من الحدث، فظهر المنتج داخل الحكاية.','Shelves and collectibles became part of the action, placing the product inside the story.'],proof:['انتقال من واجهة المتجر إلى الأرفف، وشخصيات تتحرك قبل عودة الموظف.','A route from the storefront to the shelves, with characters awakening before the employee returns.'],value:['يمكن تطوير عالم ينطلق من هوية متجرك ومنتجاته، مع نهاية توجه المشاهد إلى خطوة واضحة.','A new world could grow from your store and products, ending with a clear next step for viewers.'],deliver:['فيلم للمتجر مع نسخ قصيرة ومقاسات للقنوات المختارة، بحسب النطاق.','A retail film with selected cutdowns and channel formats, scoped for the project.'],credit:['فكرة وإنتاج أوراكشن. منشور بالتعاون مع gamestore.kw.','Concept and production by ORAKTION. Published with gamestore.kw.'],url:'https://salman-creative-work.github.io/assets/oraktion-gamestore.mp4',duration:'01:27'},
 ayat:{title:['لمسة من السحر','A Touch of Magic'],label:['آيات اليحيى / إعلان تجميل','AYAT AL YAHYA / Beauty film'],image:'ayat',idea:['كيف يصبح التجميل حكاية مرحة؟','How can a beauty service become a playful story?'],decision:['فرشاة المكياج تحرك التحول في القصة، مع حضور هوية آيات داخل العالم البصري.','The makeup brush drives the transformation, with Ayat’s identity built into the visual world.'],proof:['شخصيات فاكهة، صالون يحمل الهوية، فرشاة بضوء ذهبي، ثم خاتمة تحمل العلامة.','Fruit characters, a branded salon, a golden brush and a branded finale.'],value:['يمكن تصميم شخصية واتجاه بصري يناسبان علامتك، مع قصة أصلية حول الخدمة التي تقدمها.','An original character and visual direction could introduce your service in a way that fits your brand.'],deliver:['إعلان للخدمة، مقتطفات للنشر، وكتابة ترافق الحملة بحسب الاتفاق.','A service film, social cutdowns and supporting campaign copy, as agreed.'],credit:['إنتاج أوراكشن. الحكاية معالجة إبداعية خيالية للتجميل.','Production by ORAKTION. The transformation is a fictional creative treatment.'],url:'https://salman-creative-work.github.io/assets/oraktion-ayat-magic.mp4',duration:'01:13'},
 numbers:{title:['الأرقام المتكررة','Recurring Numbers'],label:['14:41 / غموض قصصي','14:41 / Story and suspense'],image:'numbers',idea:['كيف تصبح التفاصيل سببًا لمتابعة القصة؟','How can details give viewers a reason to follow the story?'],decision:['الساعة والمنارة والإشارات المتكررة تربط المشاهد بخيط الغموض.','The clock, lighthouse and recurring signs connect scenes through the mystery.'],proof:['تكرار العلامات داخل الصورة وتتابعها مع الحوار والأداء.','Recurring visual clues and their progression alongside dialogue and performance.'],value:['يمكن تطوير تريلر أو عالم قصصي تتكرر فيه إشارات تخدم الفكرة، مع وضوح الأدوار الإبداعية.','A trailer or story world could use recurring cues to support the idea, with clear creative credits.'],deliver:['معالجة ومشهد أو تريلر، مع اتجاه للصورة والصوت بحسب القصة.','A treatment and scene or trailer, with a visual and sound direction suited to the story.'],credit:['القصة: سينسي. الرؤية والإخراج وأداء إبراهيم: سلمان. لارا: نور علي.','Story: Sensei. Vision, direction and Ibrahim’s voice: Salman. Lara: Noor Ali.'],url:'https://www.youtube.com/watch?v=O_yIDS8B7Mo',duration:''}
};
  const scopes={
 monthly:{name:['إدارة محتوى بقيادة إبداعية','Creatively led content management'],kind:['تعاون مستمر','Recurring collaboration'],why:['اتجاه إبداعي ورسائل واضحة تقود محتوى الشهر، مع نشر منظم ومراجعة لما يستحق التطوير.','A creative direction and clear messages for the month, supported by organised publishing and review.'],items:[['اتجاه إبداعي ورسائل محورية وخطة للشهر مرتبطة بهدف الحساب','A creative direction, core messages and a monthly plan linked to the account’s goal'],['كتابة وتدقيق وإنتاج الدفعة المعتمدة','Copy, proofreading and the agreed content batch'],['جدولة ونشر وتقرير مراجعة شهري','Scheduling, publishing and a monthly review']],limits:['نحدد المنصات وعدد القطع ومدد الفيديو وجولات المراجعة. الردود والإعلان المدفوع والفيلم السينمائي نطاقات مستقلة.','We agree platforms, asset counts, video lengths and revision rounds. Community replies, paid ads and a cinematic film are separate scopes.']},
 film:{name:['فيلم سينمائي بالـAI','AI cinematic film'],kind:['مشروع محدد','Project engagement'],why:['فكرة تُبنى حول علامتك وتتحول إلى فيلم متكامل في الصورة والصوت.','An idea built around your brand, developed into a film with a coherent visual and sound direction.'],items:[['فكرة ومعالجة ونص للموافقة','Concept, treatment and script for approval'],['إخراج مشاهد AI ومونتاج وتصميم صوت','AI scene direction, editing and sound design'],['نسخة رئيسية ونسخ نشر بحسب الاتفاق','A master film and agreed publishing versions']],limits:['نحدد المدة وتعقيد المشاهد والأصوات والمقاسات والتعديلات. النشر المستمر وميزانية الإعلان مستقلان.','We agree duration, scene complexity, voices, formats and revisions. Ongoing publishing and media spend are separate.']},
 launch:{name:['حملة إطلاق إبداعية','Creative launch campaign'],kind:['حملة بنطاق ومدة','A campaign with a defined scope'],why:['فكرة واحدة تربط الفيلم والمحتوى الداعم عبر مراحل الإطلاق.','One idea connecting the film and supporting content throughout the launch.'],items:[['رسالة ومعالجة موحدة للحملة','A shared campaign message and creative treatment'],['فيلم رئيسي ومحتوى داعم مشتق من الفكرة','A lead film and supporting campaign assets'],['خطة نشر ومراجعة للنتائج المتاحة','A publishing plan and review of available results']],limits:['نحدد الفترة والأصول الأصلية والنسخ ومسؤولية النشر والردود. أجر إدارة الإعلان وميزانيته يظهران منفصلين.','We agree the period, original assets, versions, publishing and reply responsibilities. Ad management fees and media spend are shown separately.']}
};

  // The approved treatment adds context; the portfolio library owns work facts and credits.
  const references = {store:['cinema','gamestore'],ayat:['cinema','ayat-magic'],numbers:['stories','recurring-numbers']};
  for (const [id,[collection,sourceId]] of Object.entries(references)) {
    const source = data[collection]?.find(item => item.id === sourceId);
    if (!source) continue;
    const view = work[id];
    view.source = source;
    view.title = [source.ar,source.en];
    view.image = localAsset(source.image);
    view.video = localAsset(source.video);
    view.youtubeId = /^[A-Za-z0-9_-]{11}$/.test(source.youtubeId || '') ? source.youtubeId : null;
    view.url = typeof source.url === 'string' && /^https:\/\//.test(source.url) ? source.url : null;
    view.role = [source.roleAr || '',source.roleEn || ''];
    view.credit = ['Ar','En'].map(language => [...new Set([source['role'+language],source['note'+language],collection==='stories'?source['detail'+language]:null].filter(Boolean))].join(' '));
    if (source.ideaAr && source.ideaEn) view.idea = [source.ideaAr,source.ideaEn];
    if (collection === 'cinema' && source.detailAr && source.detailEn) view.proof = [source.detailAr,source.detailEn];
    if (source.kindAr && source.kindEn) view.label = [source.kindAr,source.kindEn];
  }
  const ownVoices = (data.voice || []).filter(item => voiceTypes.itemCategory[item.id]);
  const voiceCategory = item => item.performanceCategory || voiceTypes.itemCategory[item.id];
  const categoryLabel = category => t(voiceTypes.categories.find(item => item.id === category)?.label);
  const noor = window.PORTFOLIO_COLLABORATORS?.noor;

  function stopMedia(){
    root.querySelectorAll('video,audio').forEach(media => media.pause());
  }
  function art(item,caption){
    return `<figure class="vs-art"><img src="${esc(item.image)}" alt="${esc(t(item.title))}"><figcaption>${esc(caption)}</figcaption></figure>`;
  }
  function media(item){
    let content;
    if (item.video) content = `<video class="vs-film" controls playsinline preload="none" poster="${esc(item.image)}" src="${esc(item.video)}" aria-label="${esc(t(item.title))}"></video>`;
    else if (item.youtubeId) content = `<div class="vs-embed-slot"><button type="button" class="vs-player-trigger" data-youtube="${item.youtubeId}" aria-label="${esc(pick('افتح مشغّل ','Open the player for ')+t(item.title))}"><img src="${esc(item.image)}" alt="${esc(t(item.title))}"><span>▶ ${pick('شاهد الفيلم هنا','Watch the film here')}</span></button></div>`;
    else content = `<img src="${esc(item.image)}" alt="${esc(t(item.title))}">`;
    return `<figure class="vs-art">${content}<figcaption class="vs-media-caption">${esc(t(item.label))}</figcaption></figure>`;
  }
  function sourceLink(item){
    return item.url ? `<a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${pick('المصدر الأصلي ↗','Original source ↗')}</a>` : '';
  }
  function workButtons(){return `<div class="vs-cases" role="group" aria-label="${pick('اختر عملًا','Choose a work')}">${Object.entries(work).map(([id,item])=>button(t(item.title),`data-work="${id}" aria-pressed="${state.work===id}"`)).join('')}</div>`;}
  function scopeButtons(){return `<div class="vs-cases" role="group" aria-label="${pick('نطاق التعاون','Engagement scope')}">${Object.entries(scopes).map(([id,item])=>button(t(item.name),`data-scope="${id}" aria-pressed="${state.scope===id}"`)).join('')}</div>`;}
  function fact(label,value){return `<div class="vs-fact"><b>${esc(label)}</b>${esc(value)}</div>`;}

  function ownVoicePanel(){
    const visible=ownVoices.filter(item=>state.voiceCategory==='all'||voiceCategory(item)===state.voiceCategory);
    return `<section class="vs-voices" aria-labelledby="vs-own-title"><div class="vs-voices-head"><h2 id="vs-own-title">${pick('صوتي، في شخصيات مختلفة.','My voice, through different characters.')}</h2>${button(state.ownVoices?pick('إخفاء مقاطعي','Hide my samples'):pick('استكشف مقاطعي الصوتية','Explore my voice performances'),`data-toggle-own-voices aria-expanded="${state.ownVoices}" aria-controls="vs-own-content"`)}</div><p class="vs-voices-intro">${esc(t(voiceTypes.intro))} ${pick('كل النماذج أداء بشري بصوت سلمان.','All samples feature Salman’s human voice performance.')}</p><div id="vs-own-content" ${state.ownVoices?'':'hidden'}><div class="vs-cases" role="group" aria-label="${pick('أنواع الأداء','Performance types')}">${voiceTypes.categories.map(item=>button(t(item.label),`data-voice-category="${item.id}" aria-pressed="${state.voiceCategory===item.id}"`)).join('')}</div><p class="vs-credit vs-category-count" role="status">${visible.length} ${pick('من نماذج الأداء','performance samples')}</p><div class="vs-own-grid">${visible.map(item=>`<article class="vs-own-card"><img src="${esc(localAsset(item.image))}" alt="${esc(sourceTitle(item))}" loading="lazy"><div class="vs-own-meta"><span class="vs-label">${esc(categoryLabel(voiceCategory(item)))}</span><h3>${esc(sourceTitle(item))}</h3><p>${esc(field(item,'focus'))}</p><p>${pick('سلمان · ','Salman · ')}${esc(field(item,'role'))}</p><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${pick('شاهد الأداء ↗','Watch the performance ↗')}</a><details><summary>${pick('الأدوار والاعتمادات','Roles and credits')}</summary><p>${esc(field(item,'detail'))}</p></details></div></article>`).join('')}</div><div class="vs-actions">${link(pick('افتح مكتبة الصوت كاملة','Explore the full voice library'),libraryLink('voice'))}</div></div></section>`;
  }
  function collaboratorSample(item){
    const reference=item.reference;
    const original=reference ? data[reference.collection]?.find(work=>work.id===reference.id) : null;
    const image=original?.image || item.image;
    const url=original?.url || item.url;
    const credit=original ? field(original,'detail') : field(item,'credit');
    return `<article class="vs-voice-sample ${reference?'':'vs-perfume'}"><img src="${esc(localAsset(image))}" alt="${esc(field(item,'title'))}" loading="lazy"><div class="vs-voice-sample-body"><span class="vs-label">${esc(field(item,'badge'))}</span><h3>${esc(field(item,'title'))}</h3><p>${esc(field(item,'description'))}</p><p class="vs-credit">${esc(credit)}</p><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(field(item,'watch'))}</a></div></article>`;
  }
  function collaboratorPanel(){
    if (!noor) return '';
    const enquiry=pick('مرحبًا سلمان، أرغب في مناقشة أداء صوتي لمشروعي. لفتني أداء نور علي، وأود بحث النبرة المناسبة وإمكانية مشاركتها بحسب النطاق والتوفر وموافقتها.','Hello Salman, I would like to discuss voice performance for my project. Noor Ali’s work caught my attention. I would like to explore the right tone and her possible participation, subject to scope, availability and agreement.');
    return `<section class="vs-voices" aria-labelledby="vs-voices-title"><div class="vs-voices-head"><h2 id="vs-voices-title">${pick('أصوات نتعاون معها','Voices we collaborate with')}</h2>${button(state.collaborators?pick('إخفاء النماذج','Hide samples'):pick('استكشف أداء نور علي','Explore Noor Ali’s voice'),`data-toggle-collaborators aria-expanded="${state.collaborators}" aria-controls="vs-collaborator-content"`)}</div><p class="vs-voices-intro">${pick('أصوات شاركتنا أعمالًا، ونماذج تساعدك على تصور الأداء المناسب. نناقش اختيار المؤدي بحسب مشروعك وتوفره واتفاقه على المشاركة.','Voices featured in our collaborations, with samples to help you explore the right performance. Casting is discussed for each project, subject to the performer’s availability and agreement.')}</p><div id="vs-collaborator-content" ${state.collaborators?'':'hidden'}><article class="vs-voice-profile"><div class="vs-voice-person has-portrait"><div class="vs-voice-headshot"><img class="vs-voice-portrait" src="${esc(localAsset(noor.portrait))}" alt="${esc(field(noor,'name'))}" loading="lazy"></div><div><span class="vs-label">${pick('أداء صوتي بشري','HUMAN VOICE PERFORMANCE')}</span><h3 class="vs-voice-name">${esc(field(noor,'name'))}</h3><a class="vs-voice-handle" href="${esc(noor.url)}" target="_blank" rel="noopener noreferrer">${esc(noor.handle)}</a><p class="vs-voice-bio">${esc(field(noor,'bio'))}</p><div class="vs-actions">${link(pick('ناقش الصوت المناسب لمشروعك','Discuss the right voice for your project'),whatsapp(enquiry),true)}</div><p class="vs-credit">${pick('المشاركة تُناقَش بحسب طبيعة المشروع وتوفر المؤدية وموافقتها.','Participation depends on the project, the performer’s availability and agreement.')}</p></div></div><div class="vs-voice-samples">${(noor.samples||[]).map(collaboratorSample).join('')}</div></article></div></section>`;
  }
  function draftKey(){return [state.lang,state.audience,state.scope,state.work,state.material].join(':');}
  function defaultMessage(){
    const item=work[state.work],scope=scopes[state.scope];
    if(state.audience==='hiring')return pick(`مرحبًا سلمان، أرغب في مناقشة فرصة تناسب خبرتك في الإخراج الإبداعي بالـAI والإنتاج المتعدد الوسائط. لفتني عمل «${t(item.title)}». أود الاطلاع على سيرتك الذاتية ومناقشة متطلبات الدور.\n\nالجهة والدور المقترح: `,`Hello Salman, I would like to discuss a role suited to your AI creative direction and multimedia experience. “${t(item.title)}” caught my attention. I would like to request your CV and discuss the role requirements.\n\nCompany and proposed role: `);
    return pick(`مرحبًا سلمان، مهتم بخدمة «${t(scope.name)}». لفتني عمل «${t(item.title)}»، وأرغب في مناقشة اتجاه أصلي يناسب مشروعي ونطاق تنفيذه.\n\nنقطة البداية: ${state.material==='existing'?'لدي صور أو فيديو للمنتج.':'أبدأ من فكرة وأحتاج إلى تطوير المراجع والمعالجة.'}\nوصف المشروع والجمهور: `,`Hello Salman, I am interested in ${t(scope.name)}. “${t(item.title)}” caught my attention. I would like to discuss an original direction for my project and its scope.\n\nStarting point: ${state.material==='existing'?'I have product photos or footage.':'I am starting with an idea and need references and a treatment.'}\nProject and audience: `);
  }
  function currentDraft(){const key=draftKey();if(!drafts.has(key))drafts.set(key,defaultMessage());return drafts.get(key);}
  function briefScene(){
    const hiring=state.audience==='hiring',item=work[state.work],scope=scopes[state.scope];
    const rows=hiring?[[pick('المحادثة','Conversation'),pick('فرصة عمل أو تعاون مع فريق','A role or collaboration with a team')],[pick('المساهمة','Contribution'),'AI Creative Direction & Multimedia'],[pick('عمل للمناقشة','Work to discuss'),t(item.title)],[pick('الخطوة التالية','Next step'),pick('طلب السيرة ومناقشة متطلبات الدور','Request a CV and discuss the role')]]:[[pick('نطاق مبدئي','Initial scope'),t(scope.name)],[pick('الهدف','Purpose'),t(scope.why)],[pick('مرجع للنقاش','Reference for discussion'),t(item.title)],[pick('ما نحدده معًا','To agree together'),pick('الجمهور والمخرجات والمدة والميزانية','Audience, deliverables, schedule and budget')]];
    return kicker(pick('لنبدأ محادثة لها سياق','START A CONVERSATION WITH CONTEXT'))+title(pick('هذه نقطة بداية، ونكملها معًا.','A starting point we can build on.'))+sub(pick('راجع ملخصك وأضف ما تريد إيضاحه، ثم افتح الرسالة في واتساب.','Review your summary, add anything you want to explain, then open the message in WhatsApp.'))+`<div class="vs-brief">${rows.map(row=>`<div><b>${esc(row[0])}</b><p>${esc(row[1])}</p></div>`).join('')}</div><label class="vs-message-label" for="vs-enquiry-message">${pick('رسالتك إلى سلمان — يمكنك تعديلها','Your message to Salman — you can edit it')}</label><textarea id="vs-enquiry-message" class="vs-message-input" data-vs-message maxlength="5000" dir="${state.lang==='ar'?'rtl':'ltr'}">${esc(currentDraft())}</textarea><div class="vs-actions"><a class="vs-action-link vs-primary" data-vs-whatsapp href="${esc(whatsapp(currentDraft()))}" target="_blank" rel="noopener noreferrer">${pick('تواصل عبر واتساب ↗','Continue on WhatsApp ↗')}</a>${button(hiring?pick('راجع الخبرات','Review my experience'):pick('تعديل الاختيارات','Edit the choices'),`data-scene="${hiring?7:1}"`)}${hiring?'':link(pick('أكمل موجزًا تفصيليًا','Build a detailed creative brief'),libraryLink('brief'))}</div><p class="vs-credit">${pick('تفتح الرسالة في واتساب لتراجعها وترسلها بنفسك. السيرة التفصيلية متاحة عند الطلب.','The message opens in WhatsApp for you to review and send. The detailed CV is available on request.')}</p>`;
  }
  function updateContactLink(){
    const action=root.querySelector('[data-vs-whatsapp]');
    if(action)action.href=whatsapp(currentDraft());
  }

  function render(){
const w=work[state.work],s=scopes[state.scope];
const order=state.audience==='hiring'?[0,7,2,3,8]:[0,1,2,3,4,5,6,7,8];
root.dir=state.lang==='ar'?'rtl':'ltr';root.lang=state.lang;document.documentElement.dir=root.dir;document.documentElement.lang=state.lang;
root.querySelector('[data-vs-library]').textContent=pick('مكتبة الأعمال ↗','Work library ↗');root.querySelector('[data-vs-library]').href=libraryLink('work');
root.querySelector('[data-vs-language]').setAttribute('aria-label',pick('Switch to English','التبديل إلى العربية'));document.querySelector('[data-vs-skip]').textContent=pick('تجاوز إلى المحتوى','Skip to content');
root.querySelector('[data-vs-language]').textContent=state.lang==='ar'?'EN':'العربية';
root.querySelector('[data-vs-nav]').setAttribute('aria-label',pick('مشاهد العرض','Presentation chapters'));
root.querySelector('[data-vs-nav]').innerHTML=order.map((n,i)=>`<button type="button" data-scene="${n}" ${n===state.scene?'aria-current="step"':''}>${String(i+1).padStart(2,'0')} ${esc(t(chapters[n]))}</button>`).join('')+(state.audience==='hiring'?button(pick('خدمات المشاريع','Project services'),'data-route="project"'):button(pick('الملف المهني','Professional profile'),'data-route="hiring"'));
let content='';
if(state.scene===0)content=`<div class="vs-cover"><div>${kicker('AI CREATIVE DIRECTOR & MULTIMEDIA CREATOR')}<div class="vs-portrait-signature"><img src="../assets/portrait.png" alt="Salman Al Husseini" width="64" height="64"><span>${pick('صاحب الرؤية الإبداعية وراء أوراكشن','The creative behind ORAKTION')}</span></div><h1 id="vs-scene-heading" tabindex="-1" class="vs-name">Salman<br>Al Husseini</h1><h2 class="vs-title">${pick('أحوّل الأفكار إلى عوالم تخدم رسالتك.','Ideas become worlds that carry your message.')}</h2>${sub(pick('أقود في أوراكشن الفكرة والإخراج بالـAI؛ لتصبح علامتك أو حكايتك عالمًا له صورته وصوته. وقد يكون واقعيًا أو خياليًا، بحسب ما تريد قوله.','At ORAKTION, I lead the idea and AI direction, giving your brand or story a world with its own image and sound. Realistic or imagined, it begins with what you want to say.'))}<div class="vs-actions">${button(pick('لدي مشروع','I have a project'),'data-route="project"',true)}${button(pick('أبحث عن مبدع لفريقي','I am looking for a creative'),'data-route="hiring"')}</div></div>${art(work.store,pick('من أعمال أوراكشن: GAMESTORE، بعد الإغلاق.','From ORAKTION: GAMESTORE, After Closing.'))}</div>`;
if(state.scene===1)content=kicker(pick('نبدأ بما تريد تطويره','START WITH WHAT YOU NEED'))+title(pick('ما الإضافة التي تبحث عنها؟','What would make a difference?'))+sub(pick('اختر نقطة البداية، أو انتقل مباشرة إلى أي جزء من العرض.','Choose a starting point, or jump to any chapter.'))+`<div class="vs-grid">${Object.entries(scopes).map(([id,p],i)=>`<button type="button" class="vs-tile" data-goal="${id}" aria-pressed="${state.scope===id}"><span class="vs-index">0${i+1}</span><strong>${esc(t(p.name))}</strong><span>${esc(t(p.why))}</span></button>`).join('')}</div><div class="vs-context">${pick('اختيارك يحدد سياق المناقشة. نتفق على الفكرة والنطاق بعد معرفة نشاطك وجمهورك.','Your choice sets the context. We agree the idea and scope after understanding your business and audience.')}</div><div class="vs-actions">${button(pick('شاهد عينة وسبب اختيارها','See the work and the thinking'),'data-scene="2"',true)}</div>`;
if(state.scene===2)content=workButtons()+`<div class="vs-case">${media(w)}<div>${kicker(t(w.label))}${title(t(w.title))}${sub(t(w.idea))}${fact(pick('ماذا ترى في العمل؟','What to look for'),t(w.proof))}<p class="vs-credit">${esc(t(w.credit))}</p><div class="vs-actions">${button(pick('كيف ينطبق على مشروعي؟','How could this relate to my project?'),'data-scene="3"',true)}${sourceLink(w)}</div></div></div>`;
if(state.scene===3)content=kicker(pick('دليل الحرفة','THE CRAFT BEHIND THE WORK'))+title(pick('المشهد يجذبك. القرار يوضح قيمته.','The scene draws you in. The decision shows its value.'))+workButtons()+`<div class="vs-grid"><article class="vs-tile"><span class="vs-label">${pick('01 / قرار الإخراج','01 / Direction')}</span><p>${esc(t(w.decision))}</p></article><article class="vs-tile"><span class="vs-label">${pick('02 / ما يمكن تطويره لك','02 / A possible application')}</span><p>${esc(t(w.value))}</p></article><article class="vs-tile"><span class="vs-label">${pick('03 / مخرجات للنقاش','03 / Deliverables to discuss')}</span><p>${esc(t(w.deliver))}</p></article></div><p class="vs-credit">${esc(t(w.credit))}</p><div class="vs-actions">${button(pick('حدّد نطاق التعاون','Explore the scope'),'data-scene="4"',true)}${button(pick('تعرّف إلى مساهمتي المهنية','Explore my professional contribution'),'data-route="hiring"')}</div>`;
if(state.scene===4)content=kicker(pick('نطاقات مقترحة للمناقشة','PROPOSED ENGAGEMENTS'))+title(pick('تعاون يناسب ما تحتاجه.','A collaboration shaped around your need.'))+scopeButtons()+`<div class="vs-scope"><div>${sub(t(s.why))}<ul>${s.items.map(i=>`<li>${esc(t(i))}</li>`).join('')}</ul></div><aside class="vs-tile"><span class="vs-label">${esc(t(s.kind))}</span><h3>${esc(t(s.name))}</h3><p>${esc(t(s.limits))}</p></aside></div><div class="vs-context">${pick('تُعتمد الكميات والمدة والسعر بعد تثبيت النطاق. أتعاب الإبداع والإدارة منفصلة عن ميزانية الإعلانات.','Quantities, schedule and price are agreed after scoping. Creative and management fees are separate from media spend.')}</div><div class="vs-actions">${button(pick('كيف سنعمل معًا؟','How would we work together?'),'data-scene="5"',true)}</div>`;
if(state.scene===5){const steps=[['نفهم المطلوب','Understand the brief','أنت توضح النشاط والجمهور والمواد المتاحة. أحدد معك الهدف والنطاق.','You explain the business, audience and available assets. We agree the goal and scope.'],['نعتمد الاتجاه','Agree the direction','أعرض المعالجة والنص واتجاه الصورة قبل الإنتاج. نعتمد نقاط المراجعة.','I present the treatment, script and visual direction before production. We agree review points.'],['ننتج ونراجع','Produce and review','أقود التنفيذ والمونتاج والصوت، وأجمع ملاحظاتك في الجولات المتفق عليها.','I lead production, editing and sound, incorporating feedback in the agreed rounds.'],['نسلّم ونتابع','Deliver and review','نسلّم المخرجات المتفق عليها. الإدارة الشهرية تتبعها مراجعة وخطة للدورة التالية.','We deliver the agreed assets. Monthly management includes a review and a plan for the next cycle.']];content=kicker(pick('من الفكرة إلى التسليم','FROM CONCEPT TO DELIVERY'))+title(pick('تعرف ما يحدث في كل مرحلة.','You know what happens at each stage.'))+`<div class="vs-steps">${steps.map((a,i)=>`<article class="vs-step"><b>0${i+1}</b><h3>${pick(a[0],a[1])}</h3><p>${pick(a[2],a[3])}</p></article>`).join('')}</div><div class="vs-context">${pick('للوكالات: نحدد ما يقدمه فريقكم وما أتولى تنفيذه، والمقاسات والتسميات وآلية اعتماد النسخ.','For agencies: we agree what your team supplies, what I produce, required formats, file naming and approvals.')}</div>`;}
if(state.scene===6)content=kicker(pick('الإبداع له هدف يمكن مراجعته','CREATIVE WORK WITH A REVIEWABLE PURPOSE'))+title(pick('ما الذي نريد أن يتغير؟','What are we trying to change?'))+`<div class="vs-grid"><article class="vs-tile"><h3>${pick('وضوح الرسالة','Message clarity')}</h3><p>${pick('هل فهم أشخاص من الجمهور الخدمة والخطوة التالية عند مشاهدة النموذج؟','Do people from the intended audience understand the service and the next step?')}</p></article><article class="vs-tile"><h3>${pick('جودة الاستجابة','Response quality')}</h3><p>${pick('نراجع الاستفسارات الملائمة وطلبات التواصل المتاحة، ونميزها عن المشاهدات وحدها.','We review relevant enquiries and available contact requests, separately from views alone.')}</p></article><article class="vs-tile"><h3>${pick('ما سنطوره لاحقًا','What to improve next')}</h3><p>${pick('نختبر الرسالة أو البداية أو الدعوة إلى التواصل، وفق البيانات التي تسمح بالمقارنة.','We test the message, opening or call to action when the available data supports a comparison.')}</p></article></div><div class="vs-context">${pick('نحدد المؤشرات ومصدر البيانات قبل البدء. لا تُعرض نتائج مبيعات أو نمو لم تُقَس.','We agree metrics and data sources before starting. Unmeasured sales or growth are never presented as results.')}</div>`;
if(state.scene===7)content=kicker('SALMAN AL HUSSEINI')+title(pick('وراء الصورة، شخص يقود العمل.','Behind the work, a creative who takes responsibility.'))+`<div class="vs-profile"><div>${sub(pick('مبدع ومخرج إعلانات بالـAI، بخبرة في التسويق والمونتاج سبقت أدوات التوليد. أطور الأفكار والنصوص، وأقود الصورة والصوت حتى اكتمال العمل.','An AI creative director with a background in marketing and editing that predates generative tools. I develop ideas and scripts, and lead picture and sound through completion.'))}${fact(pick('الفكرة والتنفيذ','Concept and execution'),pick('إخراج AI، كتابة عربية فصيحة، مونتاج على Premiere Pro وCapCut، وصناعة محتوى.','AI direction, fluent Arabic writing, Premiere Pro and CapCut editing, and content creation.'))}${fact(pick('الصوت والتعاون','Voice and collaboration'),pick('ممثل صوتي وفويس أوفر، وقائد فريق السهم القرمزي للدوبلاج، مع إشراف على الأداء والمراجعة اللغوية والصوت.','Voice actor and voice-over artist, and leader of the Scarlet Arrow dubbing team, with performance direction, Arabic review and audio oversight.'))}</div><aside><p class="vs-quote">${pick('سترى ما صنعته، وما قررته، ومن شاركني العمل.','You can see what I made, the decisions I took, and who I worked with.')}</p><p class="vs-credit">${pick('تُعرض المساهمات مع كل عمل. السيرة الذاتية التفصيلية متاحة عند الطلب.','Credits are shown with each project. A detailed CV is available on request.')}</p><div class="vs-actions">${button(pick('ناقش دورًا أو اطلب السيرة','Discuss a role or request my CV'),'data-hiring-brief',true)}${button(pick('راجع دليلًا من الأعمال','Review a project example'),'data-scene="3"')}</div></aside></div>`;
if(state.scene===7)content+=ownVoicePanel()+collaboratorPanel();
if(state.scene===1)content+=`<div class="vs-context"><span class="vs-label">${pick('ما الذي نبدأ منه؟','What do we start with?')}</span><div class="vs-cases">${button(pick('لدي صور أو فيديو للمنتج','I have product photos or footage'),`data-material="existing" aria-pressed="${state.material==='existing'}"`)}${button(pick('أبدأ من فكرة','I am starting with an idea'),`data-material="idea" aria-pressed="${state.material==='idea'}"`)}</div><p>${state.material==='existing'?pick('يمكن أن نبني على موادك الحقيقية ونختار أين تخدم أدوات AI الفكرة.','We can build on real product assets and decide where AI serves the idea.'):pick('نحدد المواد المرجعية وما يحتاج تصويرًا حقيقيًا قبل تطوير المعالجة.','We agree the reference material and what needs real photography before developing the treatment.')}</p></div>`;
if(state.audience==='hiring'&&state.scene===2)content=content.replace(pick('كيف ينطبق على مشروعي؟','How could this relate to my project?'),pick('ما الذي يوضح مساهمتي؟','What demonstrates my contribution?'));
if(state.audience==='hiring'&&state.scene===3)content=kicker(pick('المساهمة والقرار والتعاون','CONTRIBUTION, DECISIONS AND COLLABORATION'))+title(pick('كيف أفكر داخل العمل؟','How do I think within a project?'))+workButtons()+`<div class="vs-grid"><article class="vs-tile"><span class="vs-label">${pick('القرار الإخراجي','Directorial decision')}</span><p>${esc(t(w.decision))}</p></article><article class="vs-tile"><span class="vs-label">${pick('دليل من العمل','Evidence in the work')}</span><p>${esc(t(w.proof))}</p></article><article class="vs-tile"><span class="vs-label">${pick('المساهمات','Creative credits')}</span><p>${esc(t(w.credit))}</p></article></div><div class="vs-actions">${button(pick('ناقش الدور واطلب السيرة','Discuss the role and request my CV'),'data-hiring-brief',true)}${button(pick('شاهد العينة','Watch the example'),'data-scene="2"')}</div>`;
if(state.scene===8)content=briefScene();
stopMedia();root.querySelector('[data-vs-stage]').innerHTML=content;
updateContactLink();
root.querySelector('[data-vs-counter]').textContent=`${String(order.indexOf(state.scene)+1).padStart(2,'0')} / ${String(order.length).padStart(2,'0')}`;
root.querySelector('[data-vs-prev]').textContent=pick('السابق','Previous');root.querySelector('[data-vs-next]').textContent=pick('التالي','Next');
root.querySelector('[data-vs-prev]').disabled=state.scene===0;root.querySelector('[data-vs-next]').disabled=state.scene===8;
}

  function focusScene(){
    root.querySelector('#vs-scene-heading')?.focus({preventScroll:true});
    root.querySelector('[data-vs-stage]')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }
  document.querySelector('[data-vs-skip]')?.addEventListener('click',event=>{
    event.preventDefault();
    focusScene();
  });
  root.addEventListener('click',event=>{
    const trigger=event.target.closest('button');
    if(!trigger||!root.contains(trigger))return;
    if(trigger.dataset.youtube){
      const id=trigger.dataset.youtube;
      if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
      const iframe=document.createElement('iframe');
      iframe.className='vs-youtube';
      iframe.title=t(work[state.work].title);
      iframe.src='https://www.youtube-nocookie.com/embed/'+id+'?playsinline=1&rel=0';
      iframe.allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen=true;
      iframe.referrerPolicy='strict-origin-when-cross-origin';
      trigger.replaceWith(iframe);
      iframe.focus();
      return;
    }
    const beforeScene=state.scene,beforeLanguage=state.lang;
    let focusSelector='';
    if(trigger.dataset.voiceCategory&&voiceTypes.categories.some(item=>item.id===trigger.dataset.voiceCategory)){state.voiceCategory=trigger.dataset.voiceCategory;focusSelector=`[data-voice-category="${state.voiceCategory}"]`;}
    if(trigger.hasAttribute('data-toggle-own-voices')){state.ownVoices=!state.ownVoices;focusSelector='[data-toggle-own-voices]';}
    if(trigger.hasAttribute('data-toggle-collaborators')){state.collaborators=!state.collaborators;focusSelector='[data-toggle-collaborators]';}
    if(trigger.hasAttribute('data-vs-language'))state.lang=state.lang==='ar'?'en':'ar';
    if(trigger.dataset.scene!==undefined&&order().includes(Number(trigger.dataset.scene)))state.scene=Number(trigger.dataset.scene);
    const sequence=order();
    if(trigger.hasAttribute('data-vs-prev'))state.scene=sequence[Math.max(0,sequence.indexOf(state.scene)-1)];
    if(trigger.hasAttribute('data-vs-next'))state.scene=sequence[Math.min(sequence.length-1,sequence.indexOf(state.scene)+1)];
    if(['project','hiring'].includes(trigger.dataset.route)){state.audience=trigger.dataset.route;state.scene=state.audience==='hiring'?7:1;}
    if(work[trigger.dataset.work]){state.work=trigger.dataset.work;focusSelector=`[data-work="${state.work}"]`;}
    if(scopes[trigger.dataset.scope]){state.scope=trigger.dataset.scope;focusSelector=`[data-scope="${state.scope}"]`;}
    if(['existing','idea'].includes(trigger.dataset.material)){state.material=trigger.dataset.material;focusSelector=`[data-material="${state.material}"]`;}
    if(scopes[trigger.dataset.goal]){state.scope=trigger.dataset.goal;state.audience='project';focusSelector=`[data-goal="${state.scope}"]`;}
    if(trigger.hasAttribute('data-hiring-brief')){state.audience='hiring';state.scene=8;}
    render();
    writeRoute();
    if(beforeScene!==state.scene)focusScene();
    else if(beforeLanguage!==state.lang)root.querySelector('[data-vs-language]')?.focus({preventScroll:true});
    else if(focusSelector)root.querySelector(focusSelector)?.focus({preventScroll:true});
  });
  root.addEventListener('input',event=>{
    if(!event.target.matches('[data-vs-message]'))return;
    drafts.set(draftKey(),event.target.value);
    updateContactLink();
  });
  window.addEventListener('hashchange',()=>{readRoute();render();focusScene();});
  window.addEventListener('popstate',()=>{readRoute();render();});
  render();
})();

/* The creative brief stays in page memory. Nothing is sent until the visitor chooses to contact Salman. */
(() => {
  'use strict';
  const host = document.getElementById('creative-brief');
  if (!host) return;
  const pair = (ar, en) => ({ ar, en });
  const language = () => typeof lang !== 'undefined' && lang === 'en' ? 'en' : 'ar';
  const t = (ar, en) => language() === 'ar' ? ar : en;
  const text = value => value ? value[language()] : '';
  const options = {
    service: [
      ['film','فيلم أو إعلان بالـAI','AI film or advertisement','مشهد يمنح علامتك حضورًا.','A cinematic presence for your brand.'],
      ['story','قصة وعالم بالـAI','AI story & world','من الفكرة إلى الحكاية المرئية.','From an idea to a world on screen.'],
      ['voice','صوت وتعليق صوتي','Voice & voice-over','أداء بشري أو صوت مُنتَج بالـAI.','Human performance or an AI-produced voice.'],
      ['music','موسيقى أو لحن بالـAI','AI music & melody','هوية مسموعة تناسب الإحساس.','A sound that belongs to your idea.'],
      ['edit','مونتاج وإنتاج نهائي','Editing & post-production','إيقاع وصوت وتفاصيل متقنة.','Pacing, sound and considered detail.'],
      ['campaign','محتوى وحملة','Content & campaign','إبداع يرتبط بهدف تسويقي.','Creative work with a marketing purpose.'],
      ['unsure','أحتاج اقتراحك','Help me decide','لنبدأ بما تريد تحقيقه.','Let’s start with what you want to achieve.']
    ],
    goal: [['launch','إطلاق منتج أو مشروع','Launch a product or project'],['awareness','تعريف بعلامة أو رسالة','Introduce a brand or message'],['explain','شرح خدمة أو فكرة','Explain a service or idea'],['story','سرد قصة وإثارة إحساس','Tell a story and create a feeling'],['ongoing','محتوى مستمر للحسابات','Ongoing content for channels'],['unsure','أحتاج مساعدتك في تحديده','Help me define the goal']],
    start: [['scratch','نبتكر من الصفر','Create from scratch'],['idea','لدي فكرة أريد تطويرها','I have an idea to develop'],['script','لدي نص جاهز','I have a script'],['materials','لدي صور أو فيديو أو صوت','I have images, footage or audio'],['rework','أريد تطوير عمل موجود','Improve an existing piece'],['unsure','أحتاج اقتراحك','Help me decide']],
    style: [['cinematic','سينمائي','Cinematic'],['realistic','واقعي','Realistic'],['fantasy','فانتازي','Fantasy'],['dramatic','درامي','Dramatic'],['playful','مرح وغير متوقع','Playful & unexpected'],['unsure','اقترح عليّ','Suggest a direction']],
    voice: [['human','أداء بشري','Human performance','سلمان أو فريق السهم القرمزي بحسب المشروع.','Salman or the Scarlet Arrow team, as the project requires.'],['ai','صوت مُنتَج بالـAI','AI-produced voice','بإخراج ومعالجة صوتية.','With voice direction and sound treatment.'],['none','لا أحتاج صوتًا','No voice needed'],['unsure','اقترح الأنسب','Suggest the best fit']],
    tone: [['warm','دافئ وقريب','Warm & approachable'],['dramatic','درامي وعميق','Dramatic & expressive'],['confident','واثق وإعلاني','Confident & commercial'],['character','تمثيل شخصية','Character performance'],['educational','واضح ومعرفي','Clear & informative'],['unsure','اقترح عليّ','Suggest a tone']],
    music: [['ai','موسيقى خاصة بالـAI','Custom AI music'],['existing','لدي موسيقى','I have music'],['none','بدون موسيقى','No music'],['unsure','اقترح الأنسب','Suggest the best fit']],
    mood: [['epic','ملحمي وسينمائي','Epic & cinematic'],['warm','دافئ وعاطفي','Warm & emotional'],['mysterious','غامض ومشوّق','Mysterious & suspenseful'],['energetic','حيوي وإيقاعي','Energetic & rhythmic'],['calm','هادئ وتأملي','Calm & reflective'],['unsure','اقترح عليّ','Suggest a mood']],
    musicType: [['instrumental','موسيقى آلية','Instrumental'],['vocal','أغنية بكلمات مكتوبة وغناء مُنتَج بالـAI','Written lyrics with AI-produced vocals'],['identity','هوية أو توقيع موسيقي قصير','Short sonic identity'],['unsure','اقترح الأنسب','Suggest the best fit']],
    editNeeds: [['pacing','بناء الإيقاع والسرد','Pacing & narrative'],['sound','معالجة الصوت والمكساج','Sound treatment & mixing'],['colour','تصحيح اللون','Colour correction'],['captions','ترجمة أو كتابة على الشاشة','Captions & on-screen text'],['arabic','تدقيق وصياغة عربية','Arabic language review'],['unsure','اقترح ما يحتاجه العمل','Recommend what the work needs']],
    campaign: [['strategy','خطة وأفكار محتوى','Content plan & ideas'],['scripts','كتابة ونصوص','Writing & scripts'],['production','إنتاج محتوى مرئي وصوتي','Visual & audio production'],['full','خطة وإنتاج ونشر','Planning, production & publishing'],['unsure','اقترح الأنسب','Suggest the best fit']],
    channels: [['vertical','منصات الفيديو العمودي','Vertical video platforms'],['horizontal','يوتيوب أو عرض أفقي','YouTube or horizontal screens'],['audio','منصة صوتية أو بودكاست','Audio platform or podcast'],['multiple','عدة منصات ومقاسات','Multiple platforms & formats'],['unsure','أحتاج اقتراحك','Help me decide']],
    duration: [['short','قصير — حتى 30 ثانية تقريبًا','Short — around 30 seconds or less'],['medium','من 30 إلى 90 ثانية تقريبًا','Around 30–90 seconds'],['long','أطول أو عدة قطع','Longer or multiple pieces'],['unsure','اقترح المدة المناسبة','Recommend a suitable length']],
    cadence: [['oneoff','مشروع أو حملة واحدة','One project or campaign'],['monthly','خطة أو محتوى لشهر','A month of planning or content'],['ongoing','تعاون ومحتوى مستمر','Ongoing content and collaboration'],['unsure','اقترح النطاق المناسب','Recommend a suitable scope']]
  };
  const state = {
    service:'', goal:'', project:'', audience:'', start:'', references:'', referenceWork:null,
    style:'', voice:'', tone:'', voiceLanguage:'', music:'', mood:'', musicType:'', musicUse:'',
    editNeeds:[], campaign:'', directionNote:'', channels:[], duration:'', deadline:'', budget:'', requester:'', contact:''
  };
  let step = 0, errorKeys = [], copied = false, fallback = false;
  const stepNames = [pair('الخدمة','Service'),pair('الهدف','Purpose'),pair('البداية','Starting point'),pair('الأسلوب','Direction'),pair('التسليم','Delivery'),pair('المراجعة','Review')];
  const node = (tag, cls, content) => { const e=document.createElement(tag); if(cls)e.className=cls; if(content!==undefined)e.textContent=content; return e; };
  const availableOptions = key => key==='duration' && state.service==='campaign' ? options.cadence : key==='voice' && state.service==='voice' ? options.voice.filter(item=>item[0]!=='none') : options[key]||[];
  const labelFor = (key,value) => { const item=availableOptions(key).find(x=>x[0]===value); return item?item[language()==='ar'?1:2]:''; };
  const selectedText = key => Array.isArray(state[key]) ? state[key].map(v=>labelFor(key,v)).join(t('، ', ', ')) : labelFor(key,state[key]);
  const isFilm = () => ['film','story'].includes(state.service);
  const durationChoices = {standard:'',campaign:''};
  function setService(value) {
    if (state.service===value) return;
    const oldMode=state.service==='campaign'?'campaign':'standard';
    const newMode=value==='campaign'?'campaign':'standard';
    durationChoices[oldMode]=state.duration;
    if(oldMode!==newMode)state.duration=durationChoices[newMode];
    state.service=value;
    errorKeys=[];
  }
  const collectionKey={cinema:'cinema',story:'stories',audio:'aiAudio',voice:'voice'};
  const collectionLabels={cinema:pair('أفلام وإعلانات','Films & advertising'),story:pair('حكايات وعوالم','Stories & worlds'),audio:pair('أصوات وغناء بالـAI','AI voices & singing'),voice:pair('أداء سلمان البشري','Salman’s human performance')};
  function findWork(reference){
    if(!reference||!collectionKey[reference.collection])return null;
    const work=(window.PORTFOLIO_DATA?.[collectionKey[reference.collection]]||[]).find(item=>item.id===reference.id);
    return work?{collection:reference.collection,work}:null;
  }
  function workPreset(sample){
    const id=sample.work.id, collection=sample.collection;
    let preset;
    if(collection==='voice')preset={service:'voice',voice:'human',tone:id==='wallace'?'dramatic':id==='smurfs'?'character':'confident'};
    else if(collection==='audio')preset=id==='haydarah-song'?{service:'music',musicType:'vocal',mood:'warm'}:{service:'voice',voice:'ai',tone:'educational'};
    else if(collection==='story'||sample.work.type==='story')preset={service:'story',goal:'story',style:'fantasy'};
    else preset={service:'film',goal:sample.work.type==='ad'?'awareness':'launch',style:id==='ayat-magic'?'playful':id==='qamar'||id==='cinderella'?'fantasy':'cinematic'};
    const supported=['service','style','voice','tone','music','mood','musicType'];
    Object.entries(sample.work.briefPreset||{}).forEach(([key,value])=>{
      if(supported.includes(key)&&options[key].some(option=>option[0]===value))preset[key]=value;
    });
    return preset;
  }
  function applyReference(sample){
    const preset=workPreset(sample);setService(preset.service);
    Object.entries(preset).forEach(([key,value])=>{
      if(key==='service')return;
      if(key!=='goal'||!state.goal)state[key]=value;
    });
    state.referenceWork={collection:sample.collection,id:sample.work.id};
    errorKeys=[];copied=false;fallback=false;
  }
  function openExample(sample,trigger){
    if(sample.collection==='cinema'){
      const index=(window.PORTFOLIO_DATA.cinema||[]).findIndex(item=>item.id===sample.work.id);
      if(index>=0&&typeof openWork==='function')openWork(index,trigger);
    }else if(typeof window.openCuratedWork==='function')window.openCuratedWork(sample.collection,sample.work.id);
  }
  function referencePicker(){
    const wrap=node('div','brief-field brief-reference-picker');
    const label=node('label','brief-input-label',t('عمل من المعرض يلهم مشروعك','A portfolio reference for your project'));label.htmlFor='brief-work-reference';
    label.append(node('span','brief-optional',t('اختياري','Optional')));
    const select=node('select','brief-input');select.id='brief-work-reference';select.name='workReference';
    const empty=node('option','',t('بدون نموذج محدد','No specific reference'));empty.value='';select.append(empty);
    Object.entries(collectionKey).forEach(([collection,key])=>{
      const group=node('optgroup');group.label=text(collectionLabels[collection]);
      (window.PORTFOLIO_DATA?.[key]||[]).forEach(work=>{const choice=node('option','',work[language()]);choice.value=collection+':'+work.id;group.append(choice);});
      if(group.children.length)select.append(group);
    });
    select.value=state.referenceWork?state.referenceWork.collection+':'+state.referenceWork.id:'';
    select.addEventListener('change',()=>{
      const [collection,id]=select.value.split(':'),sample=findWork({collection,id});
      if(sample)applyReference(sample);else state.referenceWork=null;
      copied=false;fallback=false;render();document.getElementById('brief-work-reference')?.focus({preventScroll:true});
    });
    wrap.append(label,select,node('p','brief-hint',t('اختر مرجعًا للاتجاه العام. فكرتك تُطوَّر لهوية مشروعك، ويمكنك تغيير النموذج أو إزالته.','Choose a reference for the overall direction. Your idea is developed for your own identity; you can change or remove this example.')));
    return wrap;
  }
  function update(key,value) {
    if(key==='service')setService(value);else state[key]=value;
    copied=false; fallback=false;
    errorKeys=errorKeys.filter(k=>k!==key);
    const error=document.getElementById('brief-error');
    if(error && errorKeys.length===0) error.hidden=true;
    const group=host.querySelector('[data-field="'+key+'"]');
    if(group)group.removeAttribute('aria-invalid');
    renderCard();
    updateHandoff();
  }
  function choices(key,title,{required=false,multiple=false,description='',values=null}={}) {
    const field=node('fieldset','brief-field'); field.dataset.field=key;
    if(errorKeys.includes(key))field.setAttribute('aria-invalid','true');
    const legend=node('legend','',title); field.append(legend);
    if(!required)legend.append(node('span','brief-optional',t('اختياري','Optional')));
    if(description){const p=node('p','brief-hint',description);p.id='brief-hint-'+key;field.append(p);field.setAttribute('aria-describedby',p.id);}
    const grid=node('div','brief-choices'+(key==='service'?' brief-services':''));
    (values||availableOptions(key)).forEach((item,index)=>{
      const label=node('label','brief-choice');
      const input=node('input'); input.type=multiple?'checkbox':'radio';input.name=key;input.value=item[0];input.id='brief-'+key+'-'+item[0];
      input.checked=multiple?state[key].includes(item[0]):state[key]===item[0];
      if(required&&!multiple)input.required=true;
      input.addEventListener('change',()=>{
        if(multiple){
          let next=state[key].filter(v=>v!==item[0]);
          if(input.checked){if(item[0]==='unsure')next=['unsure'];else{next=next.filter(v=>v!=='unsure');next.push(item[0]);}}
          grid.querySelectorAll('input').forEach(control=>{control.checked=next.includes(control.value);});
          update(key,next);
        }
        else update(key,item[0]);
      });
      const copy=node('span','brief-choice-copy');copy.append(node('strong','',item[language()==='ar'?1:2]));
      if(item[3])copy.append(node('small','',item[language()==='ar'?3:4]));
      label.append(input,copy);grid.append(label);
    });
    field.append(grid);return field;
  }
  function inputField(key,title,{multiline=false,limit=160,placeholder='',hint='',type='text'}={}){
    const wrap=node('div','brief-field');wrap.dataset.field=key;
    const label=node('label','brief-input-label',title);label.htmlFor='brief-'+key;
    label.append(node('span','brief-optional',t('اختياري','Optional')));
    const input=node(multiline?'textarea':'input','brief-input');input.id='brief-'+key;input.name=key;input.maxLength=limit;
    if(!multiline)input.type=type;else input.rows=3;
    input.value=state[key];input.placeholder=placeholder;input.dir='auto';
    if(key==='contact')input.autocomplete='email';
    if(key==='requester')input.autocomplete='name';
    input.addEventListener('input',()=>update(key,input.value));
    wrap.append(label,input);
    if(hint){const p=node('p','brief-hint',hint);p.id='brief-hint-'+key;input.setAttribute('aria-describedby',p.id);wrap.append(p);}
    return wrap;
  }
  function requiredFor(index){
    if(index===0)return ['service'];
    if(index===1)return ['goal'];
    if(index===2)return ['start'];
    if(index===3){
      if(isFilm())return ['style'];
      if(state.service==='voice')return ['voice','tone'];
      if(state.service==='music')return ['mood','musicType'];
      if(state.service==='edit')return ['editNeeds'];
      if(state.service==='campaign')return ['campaign'];
    }
    if(index===4)return state.service==='unsure'?['channels']:['channels','duration'];
    return [];
  }
  const missingAt=index=>requiredFor(index).filter(key=>Array.isArray(state[key])?state[key].length===0:!state[key]||!availableOptions(key).some(x=>x[0]===state[key]));
  function move(index){
    step=index;errorKeys=[];copied=false;fallback=false;render();focusStep();
  }
  function focusStep(){
    const heading=document.getElementById('brief-step-title');
    heading.focus({preventScroll:true});
    document.querySelector('.brief-workspace').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }
  function next(){
    errorKeys=missingAt(step);
    if(errorKeys.length){render();const error=document.getElementById('brief-error');error.focus();return;}
    move(Math.min(5,step+1));
  }
  function scope(){
    if(!state.service)return [pair('اختر ما تريد صنعه، وسأقترح لك مسار التنفيذ.','Choose what you want to create to shape a production path.')];
    const items=[];
    if(state.start==='scratch')items.push(pair('ابتكار الفكرة والكتابة من البداية','Original concept and writing from the start'));
    else if(state.start==='idea')items.push(pair('تطوير فكرتك إلى معالجة قابلة للتنفيذ','Develop your idea into a production treatment'));
    else if(state.start==='script')items.push(pair('مراجعة النص وتطوير المعالجة','Script review and creative treatment'));
    else if(['materials','rework'].includes(state.start))items.push(pair('مراجعة المواد وتحديد ما يحتاجه العمل','Review existing material and define the work needed'));
    const s=state.service;
    if(['film','story'].includes(s)){
      items.push(pair(s==='story'?'تطوير الحكاية والعالم والإخراج بالـAI':'المعالجة البصرية والإخراج الإعلاني بالـAI',s==='story'?'Story, world development and AI direction':'Visual treatment and AI advertising direction'));
      items.push(pair('المونتاج والمعالجة النهائية للصورة والصوت','Editing and final picture and sound treatment'));
      if(state.voice==='human')items.push(pair('أداء صوتي بشري بحسب نطاق المشروع','Human voice performance within the agreed scope'));
      if(state.voice==='ai')items.push(pair('إخراج ومعالجة صوت مُنتَج بالـAI','Direction and treatment of an AI-produced voice'));
      if(state.music==='ai')items.push(pair('تطوير موسيقى أو لحن بالـAI','AI music or melody development'));
      if(state.music==='existing')items.push(pair('دمج الموسيقى المتاحة مع إيقاع العمل','Integrate supplied music with the edit'));
    }else if(s==='voice'){
      items.push(state.voice==='human'?pair('تمثيل صوتي وفويس أوفر — سلمان أو فريق السهم القرمزي','Voice acting and voice-over — Salman or Scarlet Arrow'):state.voice==='ai'?pair('إنتاج وإخراج الصوت بالـAI','AI voice production and direction'):pair('اختيار مسار الأداء البشري أو الصوت بالـAI معك','Choose human performance or AI voice together'));
      items.push(pair('مراجعة النطق والإلقاء والمعالجة الصوتية','Pronunciation, delivery and sound treatment'));
    }else if(s==='music'){
      items.push(pair('تطوير اتجاه موسيقي وإنتاج لحن بالـAI','Develop a musical direction and produce an AI melody'));
      if(state.musicType==='vocal')items.push(pair('كتابة الكلمات أو تطويرها، وإنتاج الغناء بالـAI بحسب الاتفاق','Write or develop lyrics, and produce AI vocals as agreed'));
      items.push(pair('معالجة الصوت وتكييف المقطوعة للاستخدام','Sound treatment and adaptation to the intended use'));
    }else if(s==='edit'){
      const meaningful=state.editNeeds.filter(x=>x!=='unsure');
      if(meaningful.length)meaningful.forEach(x=>{const row=options.editNeeds.find(y=>y[0]===x);items.push(pair(row[1],row[2]));});
      else items.push(pair('تقييم المادة والمونتاج والصوت بحسب حاجتها','Review the material and define editing and sound needs'));
    }else if(s==='campaign'){
      const map={strategy:pair('دراسة الجمهور وخطة وأفكار المحتوى','Audience research, content plan and ideas'),scripts:pair('الكتابة والصياغة والتدقيق العربي','Writing, copy development and Arabic review'),production:pair('إنتاج المحتوى المرئي والصوتي','Visual and audio content production'),full:pair('خطة محتوى وإنتاج وتنسيق النشر','Content planning, production and publishing coordination'),unsure:pair('تحديد خطة المحتوى والخدمات المناسبة معك','Define a suitable content plan and services together')};
      items.push(map[state.campaign]||pair('تحديد هدف الحملة ومسار المحتوى','Define the campaign purpose and content direction'));
    }else items.push(pair('مناقشة فكرتك واختيار المزيج الإبداعي المناسب','Discuss your idea and choose the right creative mix'));
    if(state.channels.length)items.push(pair('تجهيز المخرجات وفق المنصات المتفق عليها','Prepare deliverables for the agreed platforms'));
    return items;
  }
  function relevantRows(){
    const rows=[];const add=(label,value,index)=>{if(value&&String(value).trim())rows.push({label,value:String(value).trim(),step:index});};
    add(pair('الخدمة','Service'),selectedText('service'),0);
    add(pair('الهدف','Purpose'),selectedText('goal'),1);
    add(pair('المشروع أو العلامة','Project or brand'),state.project,1);
    add(pair('الجمهور والرسالة','Audience & message'),state.audience,1);
    add(pair('نقطة البداية','Starting point'),selectedText('start'),2);
    const reference=findWork(state.referenceWork);
    if(reference)add(pair('النموذج الملهم من أعمال سلمان','Reference from Salman’s work'),reference.work[language()]+(reference.work.url?' — '+reference.work.url:''),2);
    add(pair('المواد والمراجع','Material & references'),state.references,2);
    if(isFilm()){
      add(pair('الأسلوب البصري','Visual direction'),selectedText('style'),3);
      add(pair('الصوت','Voice'),selectedText('voice'),3);
      add(pair('الموسيقى','Music'),selectedText('music'),3);
    }
    if(state.service==='voice'){
      add(pair('نوع الصوت','Voice type'),selectedText('voice'),3);
      add(pair('النبرة','Tone'),selectedText('tone'),3);
      add(pair('لغة الأداء','Performance language'),state.voiceLanguage,3);
    }
    if(state.service==='music'){
      add(pair('المزاج الموسيقي','Musical mood'),selectedText('mood'),3);
      add(pair('نوع المقطوعة','Music type'),selectedText('musicType'),3);
      add(pair('استخدام المقطوعة','Intended music use'),state.musicUse,3);
    }
    if(state.service==='edit')add(pair('احتياجات المونتاج','Editing needs'),selectedText('editNeeds'),3);
    if(state.service==='campaign')add(pair('نطاق المحتوى','Content scope'),selectedText('campaign'),3);
    add(pair('ملاحظات إبداعية','Creative notes'),state.directionNote,3);
    add(pair('المنصات والمقاسات','Platforms & formats'),selectedText('channels'),4);
    if(state.service!=='unsure')add(state.service==='campaign'?pair('نطاق الحملة','Campaign timespan'):pair('المدة التقريبية','Approximate length'),selectedText('duration'),4);
    add(pair('موعد التسليم','Delivery timing'),state.deadline,4);
    add(pair('ميزانية مستهدفة','Target budget'),state.budget,4);
    add(pair('الاسم أو الجهة','Name or organisation'),state.requester,5);
    add(pair('وسيلة التواصل','Contact detail'),state.contact,5);
    return rows;
  }
  function summary(){
    return [t('مرحبًا سلمان، هذا موجز مشروعي:','Hi Salman, here is my project brief:'),'',...relevantRows().map(row=>text(row.label)+': '+row.value),'',t('نطاق مبدئي للمناقشة:','Initial scope to discuss:'),...scope().map(row=>'• '+text(row)),'',t('أرجو مراجعة النطاق والتكلفة والموعد قبل تثبيت الاتفاق.','Please review the scope, cost and schedule before we confirm the project.')].join('\n');
  }
  function validSummary(){return [0,1,2,3,4].every(i=>missingAt(i).length===0);}
  function updateHandoff(){
    const handoff=document.getElementById('brief-whatsapp');
    if(handoff)handoff.href='https://wa.me/96569975288?text='+encodeURIComponent(summary());
    const copy=document.getElementById('brief-copy-fallback');if(copy)copy.value=summary();
    const status=document.getElementById('brief-copy-status');if(status&&!copied)status.textContent='';
    if(copy&&!fallback)copy.hidden=true;
  }
  function cardExample(){
    const chosen=findWork(state.referenceWork);if(chosen)return {...chosen,chosen:true};
    if(state.service==='voice'){
      if(state.voice==='human'){
        return findWork({collection:'voice',id:state.tone==='dramatic'?'wallace':state.tone==='character'?'smurfs':'joker'});
      }
      if(state.voice==='ai')return findWork({collection:'audio',id:state.tone==='dramatic'?'zork-narrator':'moses-voice'});
      return null;
    }
    if(state.service==='music')return state.musicType==='vocal'?findWork({collection:'audio',id:'haydarah-song'}):null;
    if(['unsure',''].includes(state.service))return null;
    if(state.service==='story')return findWork({collection:'story',id:state.style==='dramatic'?'recurring-numbers':'sylvester-zark'});
    let id=state.service==='story'?'narrator':state.service==='edit'?'violet':'gamestore';
    if(state.style==='fantasy')id='qamar';
    if(state.style==='playful')id='ayat-magic';
    if(state.style==='dramatic')id='narrator';
    if(state.style==='realistic')id='violet';
    return findWork({collection:'cinema',id});
  }
  function renderCard(){
    const card=document.getElementById('brief-concept');if(!card)return;card.replaceChildren();
    const top=node('div','brief-card-top');top.append(node('span','', 'ORAKTION'),node('span','',t('تصور مشروعك','YOUR PROJECT')));card.append(top);
    const title=node('h3','brief-card-title',state.project.trim()||selectedText('service')||t('فكرتك التالية تبدأ هنا.','Your next idea starts here.'));title.dir='auto';card.append(title);
    const subtitle=node('p','brief-card-caption',t('يتكوّن هذا التصور من اختياراتك.','A direction shaped by your choices.'));card.append(subtitle);
    const chips=node('div','brief-card-chips');['goal',isFilm()?'style':state.service==='music'?'mood':state.service==='voice'?'tone':'duration'].forEach(key=>{const s=selectedText(key);if(s)chips.append(node('span','',s));});if(chips.children.length)card.append(chips);
    const sample=cardExample();
    if(sample){
      const wrap=node('div','brief-sample');
      const action=node('button','brief-sample-action');action.type='button';action.addEventListener('click',()=>openExample(sample,action));
      const img=node('img');img.src=sample.work.image;img.alt=sample.work[language()];img.loading='lazy';
      const line=node('span','brief-sample-label',sample.collection==='voice'?t('استمع إلى أداء سلمان البشري ▶','Listen to Salman’s human performance ▶'):sample.collection==='audio'?t('استكشف النموذج الصوتي بالـAI ▶','Explore the AI audio example ▶'):t('شاهد مثالًا من أعمالي ▶','Watch a work example ▶'));
      action.append(img,line);wrap.append(action,node('p','brief-sample-caption',sample.work[language()]));
      if(sample.chosen){
        const selected=node('div','brief-selected-reference');selected.append(node('span','',t('مرجعك المختار','Your selected reference')));
        const change=node('button','brief-edit',t('تغيير أو إزالة','Change or remove'));change.type='button';change.addEventListener('click',()=>move(2));selected.append(change);wrap.append(selected);
      }
      card.append(wrap);
    }else{
      const art=node('div','brief-sound-art');art.setAttribute('aria-hidden','true');const logo=node('img');logo.src='assets/oraktion-official-logo.jpg';logo.alt='';art.append(logo);card.append(art);
      if(state.service==='music'||state.service==='voice')card.append(node('p','brief-audio-note',t('نختار النموذج الصوتي المناسب معك عند مراجعة المشروع.','We will choose a suitable audio reference together when reviewing your project.')));
    }
    card.append(node('h4','',t('نطاق مبدئي يناسب اختياراتك','An initial scope for your choices')));
    const list=node('ul','brief-scope');scope().forEach(item=>list.append(node('li','',text(item))));card.append(list);
    if(state.channels.length)card.append(node('p','brief-card-delivery',selectedText('channels')));
    card.append(node('p','brief-card-note',t('تُراجع التفاصيل والتكلفة والموعد مع سلمان قبل الاتفاق.','Details, cost and timing are reviewed with Salman before agreement.')));
    const sign=node('div','brief-signature');sign.append(node('strong','','SALMAN AL HUSSEINI'),node('span','','AI Creative Director & Multimedia Creator'));card.append(sign);
    const returnButton=node('button','brief-card-return',t('العودة إلى اختياراتك ↑','Back to your choices ↑'));returnButton.type='button';returnButton.addEventListener('click',focusStep);card.append(returnButton);
    const live=document.getElementById('brief-live');if(live)live.textContent=t('تم تحديث تصور المشروع.','Project concept updated.');
  }
  function branch(form){
    if(isFilm()){
      form.append(choices('style',t('ما الأسلوب الذي يناسب فكرتك؟','What visual direction fits your idea?'),{required:true}),choices('voice',t('هل يحتاج العمل إلى صوت؟','Would you like a voice?')),choices('music',t('وماذا عن الموسيقى؟','What about music?')));
    }else if(state.service==='voice'){
      form.append(choices('voice',t('ما نوع الصوت الذي تبحث عنه؟','What kind of voice are you looking for?'),{required:true,values:options.voice.filter(x=>x[0]!=='none')}),choices('tone',t('كيف تريد أن يبدو الأداء؟','How should the performance feel?'),{required:true}),inputField('voiceLanguage',t('لغة الأداء أو اللهجة','Performance language or dialect'),{limit:70,placeholder:t('مثل: العربية الفصحى','For example: Modern Standard Arabic')}));
    }else if(state.service==='music'){
      form.append(choices('mood',t('ما الإحساس الذي تريد سماعه؟','What should the music feel like?'),{required:true}),choices('musicType',t('ما نوع العمل الموسيقي؟','What kind of music do you need?'),{required:true}),inputField('musicUse',t('أين ستُستخدم المقطوعة؟','How will the music be used?'),{limit:140,placeholder:t('مثل: إعلان، مقدمة برنامج، أو حكاية','For example: an advertisement, opening theme or story')}));
    }else if(state.service==='edit'){
      form.append(choices('editNeeds',t('ما الذي يحتاجه العمل؟','What does the piece need?'),{required:true,multiple:true,description:t('يمكنك اختيار أكثر من جانب.','You can choose more than one.')}));
    }else if(state.service==='campaign'){
      form.append(choices('campaign',t('كيف أساعد حساباتك أو حملتك؟','How can I help your channels or campaign?'),{required:true}));
    }else form.append(node('p','brief-hint',t('يمكننا اختيار الصورة والصوت والموسيقى معًا. أخبرني بما تتخيله أو تابع لأقترح المسار المناسب.','We can choose the visual, voice and music direction together. Share what you imagine, or continue and I will help define the path.')));
    form.append(inputField('directionNote',t('تفصيل تحب إضافته','Anything you would like to add'),{multiline:true,limit:240,placeholder:t('نبرة، أجواء، عمل أعجبك، أو شيء تريد تجنبه…','A tone, atmosphere, work you like, or something to avoid…')}));
  }
  function review(form){
    form.append(node('p','brief-hint',t('راجع اختياراتك. يمكنك تعديل أي جزء قبل فتح المحادثة.','Review your choices. You can edit any part before opening the conversation.')));
    const list=node('dl','brief-review');
    relevantRows().filter(row=>row.step<5).forEach(row=>{
      const line=node('div','brief-review-row');const copy=node('div');const value=node('dd','',row.value);value.dir='auto';copy.append(node('dt','',text(row.label)),value);
      const edit=node('button','brief-edit',t('تعديل','Edit'));edit.type='button';edit.setAttribute('aria-label',t('تعديل ','Edit ')+text(row.label));edit.addEventListener('click',()=>move(row.step));line.append(copy,edit);list.append(line);
    });form.append(list);
    const contact=node('div','brief-contact-fields');contact.append(inputField('requester',t('اسمك أو اسم الجهة','Your name or organisation'),{limit:80}),inputField('contact',t('بريد أو وسيلة تواصل بديلة','Email or another contact detail'),{limit:100,hint:t('يمكنك تركها فارغة والتواصل من حسابك على واتساب.','You can leave this blank and contact me through WhatsApp.')}));form.append(contact);
    const handoff=node('div','brief-handoff');
    const whats=node('a','button primary',t('افتح واتساب لإرسال الموجز ↗','Open WhatsApp to send the brief ↗'));whats.id='brief-whatsapp';whats.target='_blank';whats.rel='noopener';
    whats.addEventListener('click',event=>{if(!validSummary()){event.preventDefault();for(let i=0;i<5;i++){if(missingAt(i).length){step=i;next();return;}}}});
    const copy=node('button','button outline',t('انسخ الموجز','Copy the brief'));copy.id='brief-copy';copy.type='button';copy.addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(summary());copied=true;fallback=false;document.getElementById('brief-copy-status').textContent=t('تم نسخ الموجز.','Brief copied.');document.getElementById('brief-copy-fallback').hidden=true;}
      catch{fallback=true;const area=document.getElementById('brief-copy-fallback');area.hidden=false;area.value=summary();area.focus();area.select();document.getElementById('brief-copy-status').textContent=t('الموجز جاهز؛ حدده وانسخه.','Your brief is ready; select and copy it.');}
    });handoff.append(whats,copy);form.append(handoff);
    form.append(node('p','brief-hint',t('سيفتح واتساب بالموجز لتراجعه وترسله بنفسك. لا يُرسل النموذج تلقائيًا.','WhatsApp will open with the brief for you to review and send. This form does not send automatically.')));
    const status=node('p','brief-copy-status');status.id='brief-copy-status';status.setAttribute('role','status');form.append(status);
    const fallbackArea=node('textarea','brief-input');fallbackArea.id='brief-copy-fallback';fallbackArea.readOnly=true;fallbackArea.hidden=true;fallbackArea.rows=8;fallbackArea.dir='auto';fallbackArea.setAttribute('aria-label',t('موجز المشروع للنسخ','Project brief to copy'));form.append(fallbackArea);
  }
  function render(){
    host.replaceChildren();
    const intro=node('div','brief-intro');const heading=node('div');heading.append(node('p','eyebrow','CREATE WITH SALMAN / AI CREATIVE BRIEF'),node('h2','',t('لنصنع فكرتك.','Let’s create your idea.')));
    intro.append(heading,node('p','',t('اختر ما تتخيله. سأجمع الصورة والصوت والقصة في مسار يناسب مشروعك، وتظهر بطاقة تصوره مع كل اختيار.','Choose what you imagine. I will bring picture, sound and story into a path for your project. Its concept card takes shape as you choose.')));host.append(intro);
    const workspace=node('div','brief-workspace');const formWrap=node('div','brief-form-wrap');
    const progress=node('ol','brief-progress');progress.setAttribute('aria-label',t('مراحل موجز المشروع','Project brief steps'));
    stepNames.forEach((name,i)=>{const li=node('li',i===step?'current':i<step?'complete':'');if(i===step)li.setAttribute('aria-current','step');li.append(node('span','brief-step-number',String(i+1).padStart(2,'0')),node('span','',text(name)));progress.append(li);});formWrap.append(progress);
    const form=node('form','brief-form');form.id='brief-form';form.noValidate=true;form.addEventListener('submit',e=>{e.preventDefault();if(step<5)next();});
    const error=node('div','brief-error',t('اختر إجابة للأسئلة المطلوبة. يمكنك اختيار «اقترح عليّ» إن لم تحسم قرارك.','Choose an answer for the required questions. You can choose “Help me decide” if you are unsure.'));error.id='brief-error';error.tabIndex=-1;error.setAttribute('role','alert');error.hidden=errorKeys.length===0;form.append(error);
    form.append(node('p','brief-count',t('الخطوة ','STEP ')+(step+1)+t(' من 6',' OF 6')));
    const titles=[pair('ماذا تريد أن نصنع؟','What would you like to create?'),pair('ما الذي تريد تحقيقه؟','What would you like to achieve?'),pair('من أين نبدأ؟','Where do we begin?'),pair('كيف تتخيّل العمل؟','How do you imagine it?'),pair('أين سيُعرض ومتى تحتاجه؟','Where will it appear, and when?'),pair('هذا موجز مشروعك.','Here is your project brief.')];
    const title=node('h3','brief-step-title',text(titles[step]));title.id='brief-step-title';title.tabIndex=-1;form.append(title);
    if(state.referenceWork){
      const context=node('p','brief-reference-context',t('ضُبطت الخدمة واتجاهها وفق النموذج المختار. يمكنك تعديلهما، وتبقى تفاصيل مشروعك محفوظة في الصفحة.','The service and direction follow your selected reference. You can adjust them; your project details remain in this page.'));form.append(context);
    }
    const cardJump=node('button','brief-card-jump',t('عرض بطاقة تصورك ↓','View your concept card ↓'));cardJump.type='button';cardJump.addEventListener('click',()=>{const card=document.getElementById('brief-concept');card.focus({preventScroll:true});card.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});form.append(cardJump);
    if(step===0)form.append(choices('service',t('اختر الخدمة الأقرب لفكرتك','Choose the closest service'),{required:true}));
    if(step===1)form.append(choices('goal',t('ما الهدف الأساسي؟','What is the main purpose?'),{required:true}),inputField('project',t('اسم المشروع أو العلامة','Project or brand name'),{limit:100}),inputField('audience',t('الجمهور والرسالة بجملة','Your audience and message in a sentence'),{multiline:true,limit:180,placeholder:t('لمن نقدم العمل، وماذا نريد أن يشعر أو يفهم؟','Who is it for, and what should they feel or understand?')}));
    if(step===2)form.append(choices('start',t('ماذا لديك الآن؟','What do you have so far?'),{required:true}),referencePicker(),inputField('references',t('مواد أو مراجع تريد ذكرها','Materials or references to mention'),{multiline:true,limit:240,placeholder:t('صف المواد أو أضف رابطًا لمرجع مناسب.','Describe your material or add a useful reference link.'),hint:t('يمكن مشاركة الملفات لاحقًا أثناء المراسلة.','You can share files later in the conversation.')}));
    if(step===3)branch(form);
    if(step===4){
      form.append(choices('channels',t('المنصات والمقاسات المطلوبة','Platforms and formats'),{required:true,multiple:true,description:t('اختر ما يناسبك، أو دعني أقترح الصيغة.','Choose what fits, or let me recommend a format.')}));
      if(state.service!=='unsure')form.append(choices('duration',state.service==='campaign'?t('ما نطاق المحتوى أو الحملة؟','What is the content or campaign timespan?'):t('المدة التقريبية للعمل','Approximate length'),{required:true}));
      form.append(inputField('deadline',t('متى تحتاج العمل؟','When do you need it?'),{limit:80,placeholder:t('موعد محدد، أو مرن بحسب الفكرة','A date, or flexible depending on the idea')}),inputField('budget',t('ميزانية مستهدفة مع العملة','Target budget and currency'),{limit:80,placeholder:t('يمكن تركها للمناقشة','You can leave this for discussion')}));
    }
    if(step===5)review(form);
    const nav=node('div','brief-form-nav');
    if(step>0){const back=node('button','brief-back',t('رجوع','Back'));back.type='button';back.addEventListener('click',()=>move(step-1));nav.append(back);}
    if(step<5){const nextButton=node('button','button primary',step===4?t('راجع موجز المشروع','Review project brief'):t('التالي','Continue'));nextButton.type='submit';nav.append(nextButton);}form.append(nav);
    const privacy=node('p','brief-memory',t('إجاباتك تبقى في هذه الصفحة حتى تغلقها أو تعيد تحميلها.','Your answers stay in this page until you close or reload it.'));form.append(privacy);
    formWrap.append(form);
    const card=node('aside','brief-concept');card.id='brief-concept';card.tabIndex=-1;card.setAttribute('aria-label',t('بطاقة تصور المشروع','Project concept card'));
    workspace.append(formWrap,card);host.append(workspace);
    const live=node('p','brief-sr-only');live.id='brief-live';live.setAttribute('role','status');host.append(live);
    renderCard();updateHandoff();
  }
  window.renderBriefLanguage=()=>render();
  window.startCreativeBrief=service=>{
    if(options.service.some(x=>x[0]===service)){setService(service);step=1;}else step=0;
    errorKeys=[];render();focusStep();
  };
  window.startProjectFromWork=reference=>{
    const sample=findWork(reference);if(!sample)return false;
    applyReference(sample);
    step=0;errorKeys=[];copied=false;fallback=false;
    const dialog=document.getElementById('work-dialog');if(dialog?.open)dialog.close();
    render();focusStep();return true;
  };
  render();
})();

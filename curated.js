(() => {
  'use strict';
  const selected = { voice: 'joker', story: 'recurring-numbers', audio: null };
  const expandedIdea = { voice: null, story: null, audio: null };
  const collections = {
    voice: { mount: 'voice-grid', key: 'voice' },
    story: { mount: 'story-grid', key: 'stories' },
    audio: { mount: 'ai-audio-grid', key: 'aiAudio' }
  };
  const currentLanguage = () => typeof lang !== 'undefined' ? lang : (document.documentElement.lang === 'en' ? 'en' : 'ar');
  const text = (ar, en) => currentLanguage() === 'ar' ? ar : en;
  const field = (work, key) => work[key + (currentLanguage() === 'ar' ? 'Ar' : 'En')] || '';
  const title = work => work[currentLanguage()] || work.en || work.ar || '';
  const items = kind => (window.PORTFOLIO_DATA || {})[collections[kind].key] || [];
  const node = (tag, cls, content) => {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (content) element.textContent = content;
    return element;
  };
  const number = value => String(value).padStart(2, '0');
  const validYoutubeId = work => typeof work.youtubeId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(work.youtubeId);
  const stopMedia = root => root.querySelectorAll('video,audio').forEach(media => media.pause());
  const mediaLabel = kind => kind === 'voice' ? text('شاهد الأداء', 'Watch the performance') : kind === 'audio' ? text('شاهد / استمع للنموذج', 'Watch / listen to the sample') : text('ادخل الحكاية', 'Enter the story');

  function originalLink(work, label) {
    if (!work.url) return null;
    const link = node('a', 'curated-original');
    link.href = work.url;
    link.target = '_blank';
    link.rel = 'noopener';
    const platform = /instagram\.com/.test(work.url) ? text('إنستغرام', 'Instagram') : /youtu(?:be\.com|\.be)/.test(work.url) ? text('يوتيوب', 'YouTube') : text('المصدر الأصلي', 'the original source');
    link.append(node('span', '', label || text('شاهد العمل على ', 'Watch on ') + platform), node('span', 'curated-arrow', '↗'));
    link.setAttribute('aria-label', text('شاهد ', 'Watch ') + title(work) + text(' — يفتح في نافذة جديدة', ' — opens in a new window'));
    return link;
  }

  function buildMedia(work, kind, index, total) {
    const frame = node('div', 'curated-media');
    const image = node('img', 'curated-poster');
    image.src = work.image;
    image.alt = title(work);
    image.loading = 'lazy';
    if (work.position) image.style.objectPosition = work.position;
    if (work.video) {
      const video = node('video', 'curated-video');
      video.src = work.video;
      video.poster = work.image;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-label', title(work));
      frame.append(video);
    } else if (work.audio) {
      frame.classList.add('curated-audio-media');
      const audio = node('audio', 'curated-audio-player');
      audio.src = work.audio;
      audio.controls = true;
      audio.preload = 'none';
      audio.setAttribute('aria-label', title(work));
      frame.append(image, audio);
    } else if (validYoutubeId(work) || work.url) {
      const embedded = validYoutubeId(work);
      const watch = node(embedded ? 'button' : 'a', 'curated-poster-link');
      if (embedded) {
        watch.type = 'button';
        watch.setAttribute('aria-label', text('افتح مشغّل ', 'Open the player for ') + title(work));
        watch.addEventListener('click', () => {
          const player = node('iframe', 'curated-embed');
          player.src = 'https://www.youtube-nocookie.com/embed/' + work.youtubeId + '?playsinline=1&rel=0';
          player.title = title(work);
          player.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
          player.allowFullscreen = true;
          player.referrerPolicy = 'strict-origin-when-cross-origin';
          frame.classList.add('curated-embedded-media');
          watch.replaceWith(player);
          player.focus();
        });
      } else {
        watch.href = work.url;
        watch.target = '_blank';
        watch.rel = 'noopener';
        watch.setAttribute('aria-label', text('شاهد ', 'Watch ') + title(work) + text(' — يفتح المصدر الأصلي', ' — opens the original source'));
      }
      const sign = node('span', 'curated-watch-sign');
      sign.append(node('span', 'curated-play-symbol', '▶'), node('span', '', mediaLabel(kind)), node('span', 'curated-arrow', embedded ? '＋' : '↗'));
      watch.append(image, sign);
      frame.append(watch);
    } else frame.append(image);
    const marker = node('div', 'curated-frame-label');
    marker.append(node('span', '', kind === 'voice' ? 'SAROVOX / HUMAN PERFORMANCE' : kind === 'audio' ? 'ORAKTION / AI VOICE & SINGING' : 'ORAKTION / STORY WORLDS'), node('span', 'curated-counter', number(index + 1) + ' / ' + number(total)));
    frame.append(marker);
    return frame;
  }

  function detailBlock(label, content) {
    if (!content) return null;
    const block = node('div', 'curated-detail');
    block.append(node('h4', '', label), node('p', '', content));
    return block;
  }

  function caseActions(work, kind, media, copy, mount) {
    const actions = node('div', 'curated-case-actions');
    actions.setAttribute('aria-label', text('استكشف العمل وابدأ مشروعك', 'Explore the work and start your project'));
    const localPlayback = Boolean(work.video || work.audio || validYoutubeId(work));
    let watch;
    if (localPlayback) {
      watch = node('button', 'curated-action curated-action-watch', mediaLabel(kind));
      watch.type = 'button';
      watch.setAttribute('aria-label', mediaLabel(kind) + ': ' + title(work));
      watch.addEventListener('click', () => {
        const native = media.querySelector('video,audio');
        if (native) {
          native.focus();
          const playback = native.play();
          if (playback?.catch) playback.catch(() => {
            const status = mount.querySelector('.curated-status');
            if (status) status.textContent = text('استخدم زر التشغيل في المشغّل.', 'Use the play control in the player.');
          });
        } else {
          const trigger = media.querySelector('button.curated-poster-link');
          if (trigger) trigger.click();
          else media.querySelector('iframe')?.focus();
        }
        media.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      });
    } else {
      watch = originalLink(work, mediaLabel(kind));
      if (watch) watch.className = 'curated-action curated-action-watch';
    }
    if (watch) actions.append(watch);

    const idea = node('button', 'curated-action curated-action-idea', text('اكتشف الفكرة', 'Discover the idea'));
    idea.type = 'button';
    idea.id = 'curated-' + kind + '-idea-button';
    idea.setAttribute('aria-controls', 'curated-' + kind + '-idea');
    idea.setAttribute('aria-expanded', String(expandedIdea[kind] === work.id));
    const panel = node('div', 'curated-idea-panel');
    panel.id = 'curated-' + kind + '-idea';
    panel.hidden = expandedIdea[kind] !== work.id;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', idea.id);
    const premise = detailBlock(text('الفكرة', 'THE IDEA'), field(work, 'idea') || field(work, 'description'));
    const use = detailBlock(text('كيف يخدم هذا الأسلوب مشروعًا؟', 'HOW COULD THIS APPROACH SERVE A PROJECT?'), field(work, 'use'));
    if (premise) panel.append(premise);
    if (use) panel.append(use);
    idea.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      idea.setAttribute('aria-expanded', String(open));
      expandedIdea[kind] = open ? work.id : null;
    });
    actions.append(idea);

    const project = node('button', 'curated-action curated-action-project', text('هذا الأسلوب لمشروعي', 'This style for my project'));
    project.type = 'button';
    project.dataset.projectCollection = kind;
    project.dataset.projectWork = work.id;
    project.addEventListener('click', () => {
      stopMedia(media);
      if (media.querySelector('iframe')) fillStage(kind);
      if (typeof window.startProjectFromWork === 'function') window.startProjectFromWork({ collection: kind, id: work.id });
      else if (typeof window.startCreativeBrief === 'function') window.startCreativeBrief(work.briefPreset?.service || (kind === 'story' ? 'story' : 'voice'));
    });
    actions.append(project);
    copy.append(actions, panel);
  }

  function fillStage(kind) {
    const mount = document.getElementById(collections[kind].mount);
    const list = items(kind);
    const stage = mount?.querySelector('.curated-stage');
    if (!stage || !list.length) return;
    let index = list.findIndex(work => work.id === selected[kind]);
    if (index < 0) index = 0;
    selected[kind] = list[index].id;
    const work = list[index];
    stopMedia(stage);
    stage.replaceChildren();
    stage.setAttribute('aria-labelledby', 'curated-' + kind + '-title');
    const copy = node('div', 'curated-copy');
    const kicker = node('p', 'curated-kicker', kind === 'voice' ? text('من أدائي الصوتي البشري', 'MY HUMAN VOICE PERFORMANCE') : kind === 'audio' ? text('أصوات وغناء بالـAI', 'AI VOICES & SINGING') : text('حكاية من عالم أوراكشن', 'A STORY FROM ORAKTION'));
    const heading = node('h3', 'curated-title', title(work));
    heading.id = 'curated-' + kind + '-title';
    heading.tabIndex = -1;
    copy.append(kicker, heading);
    const focus = field(work, 'focus');
    if (focus) copy.append(node('p', 'curated-focus', focus));
    const description = field(work, 'description');
    if (description) copy.append(node('p', 'curated-description', description));
    const media = buildMedia(work, kind, index, list.length);
    caseActions(work, kind, media, copy, mount);
    const details = node('div', 'curated-details');
    const role = detailBlock(text('مساهمتي في العمل', 'MY CONTRIBUTION'), field(work, 'role'));
    const craft = detailBlock(text('تفاصيل واعتمادات', 'DETAILS & CREDITS'), field(work, 'detail'));
    if (role) details.append(role);
    if (craft) details.append(craft);
    if (details.children.length) copy.append(details);
    const source = originalLink(work, text('المصدر الأصلي', 'Original source'));
    if (source) copy.append(source);
    if (!work.video && !work.audio && work.url) copy.append(node('p', 'curated-source-note', validYoutubeId(work) ? text('افتح المشغّل من الصورة، أو شاهد العمل على حسابه الأصلي.', 'Open the player from the image, or watch on the original account.') : text('يفتح العمل على حسابه الأصلي.', 'Opens the work on its original account.')));
    stage.append(media, copy);
    mount.querySelectorAll('[data-curated-id]').forEach(button => {
      const active = button.dataset.curatedId === selected[kind];
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });
    const status = mount.querySelector('.curated-status');
    if (status) status.textContent = text('العمل المعروض: ', 'Selected work: ') + title(work);
  }

  function renderCollection(kind) {
    const mount = document.getElementById(collections[kind].mount);
    if (!mount) return;
    stopMedia(mount);
    mount.replaceChildren();
    mount.classList.add('curated-collection', 'curated-' + kind);
    const list = items(kind);
    if (!list.length) return;
    const stage = node('article', 'curated-stage');
    stage.id = 'curated-' + kind + '-stage';
    const navigation = node('div', 'curated-navigation');
    const navTitle = node('p', 'curated-nav-title', kind === 'voice' ? text('اختر مشهدًا. تعرّف إلى صوت آخر.', 'Choose a scene. Hear another character.') : kind === 'audio' ? text('اختر نموذجًا. استكشف الصوت والغناء بالـAI.', 'Choose a sample. Explore AI voice and singing.') : text('لكل حكاية باب. اختر عالمك.', 'Every story has a door. Choose a world.'));
    navTitle.id = 'curated-' + kind + '-nav-title';
    const navigationList = node('ol', 'curated-selectors');
    navigationList.setAttribute('aria-labelledby', navTitle.id);
    list.forEach((work, index) => {
      const item = node('li');
      const button = node('button', 'curated-select');
      button.type = 'button';
      button.dataset.curatedId = work.id;
      button.setAttribute('aria-controls', stage.id);
      button.setAttribute('aria-pressed', String(work.id === selected[kind]));
      const label = node('span', 'curated-select-copy');
      label.append(node('strong', '', title(work)));
      const focus = field(work, 'focus');
      if (focus) label.append(node('small', '', focus));
      button.append(node('span', 'curated-select-number', number(index + 1)), label, node('span', 'curated-select-mark', '↗'));
      button.addEventListener('click', () => {
        if (selected[kind] === work.id) return;
        selected[kind] = work.id;
        fillStage(kind);
        const heading = document.getElementById('curated-' + kind + '-title');
        heading?.focus({ preventScroll: true });
        mount.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      });
      item.append(button);
      navigationList.append(item);
    });
    navigation.append(navTitle, navigationList);
    const status = node('p', 'curated-status');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    mount.append(stage, navigation, status);
    fillStage(kind);
  }

  window.renderCuratedLanguage = () => {
    renderCollection('voice');
    renderCollection('story');
    renderCollection('audio');
  };
  window.openCuratedWork = (kind, id) => {
    kind = kind === 'stories' ? 'story' : ['aiAudio', 'ai-audio'].includes(kind) ? 'audio' : kind;
    if (!collections[kind] || !items(kind).some(work => work.id === id)) return false;
    selected[kind] = id;
    const mount = document.getElementById(collections[kind].mount);
    if (!mount) return false;
    if (!mount.querySelector('.curated-stage')) renderCollection(kind);
    else fillStage(kind);
    const heading = document.getElementById('curated-' + kind + '-title');
    heading?.focus({ preventScroll: true });
    mount.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    return true;
  };
  window.renderCuratedLanguage();
})();

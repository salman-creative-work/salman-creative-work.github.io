(() => {
  'use strict';
  const mount = document.getElementById('voice-collaborators');
  const noor = window.PORTFOLIO_COLLABORATORS?.noor;
  if (!mount || !noor) return;
  let expanded = true;
  const language = () => document.documentElement.lang === 'en' ? 'En' : 'Ar';
  const field = (value, key) => value[key + language()] || '';
  const text = (ar, en) => language() === 'Ar' ? ar : en;
  const node = (tag, cls, value) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (value) e.textContent = value;
    return e;
  };
  function link(label, url, cls) {
    const a = node('a', cls, label);
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  }
  function render() {
    mount.replaceChildren();
    const heading = node('div', 'collaborator-heading');
    const title = node('h2', '', text('أصوات نتعاون معها', 'Voices we collaborate with'));
    title.id = 'collaborators-title';
    const toggle = node('button', 'collaborator-toggle', expanded ? text('إخفاء النماذج', 'Hide samples') : text('استكشف أداء نور علي', 'Explore Noor Ali’s voice'));
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-controls', 'noor-voice-samples');
    const content = node('div', 'collaborator-content');
    content.id = 'noor-voice-samples';
    content.hidden = !expanded;
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      content.hidden = !expanded;
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? text('إخفاء النماذج', 'Hide samples') : text('استكشف أداء نور علي', 'Explore Noor Ali’s voice');
    });
    heading.append(title, toggle);
    mount.append(heading, node('p', 'collaborator-intro', text('أصوات شاركتنا أعمالًا، ونماذج تساعدك على تصور الأداء المناسب لمشروعك.', 'Voices featured in our collaborations, with samples to help you explore the right performance for your project.')));
    const profile = node('article', 'collaborator-profile');
    const person = node('div', 'collaborator-person');
    const crop = node('div', 'collaborator-portrait');
    const portrait = node('img');
    portrait.src = noor.portrait;
    portrait.alt = field(noor, 'name');
    portrait.loading = 'lazy';
    portrait.width = 360;
    portrait.height = 640;
    crop.append(portrait);
    const bio = node('div', 'collaborator-bio');
    bio.append(node('p', 'collaborator-label', text('أداء صوتي بشري', 'HUMAN VOICE PERFORMANCE')), node('h3', '', field(noor, 'name')));
    bio.append(link(noor.handle, noor.url, 'collaborator-handle'), node('p', '', field(noor, 'bio')));
    const message = text('مرحبًا سلمان، أرغب في مناقشة أداء صوتي لمشروعي. لفتني أداء نور علي، وأود بحث النبرة المناسبة وإمكانية مشاركتها بحسب النطاق والتوفر.', 'Hello Salman, I would like to discuss voice performance for my project. Noor Ali’s work caught my attention, and I would like to explore the right tone and her possible participation, subject to scope and availability.');
    bio.append(link(text('ناقش الصوت المناسب لمشروعك ↗', 'Discuss the right voice for your project ↗'), 'https://wa.me/96569975288?text=' + encodeURIComponent(message), 'button primary collaborator-enquiry'));
    bio.append(node('p', 'collaborator-note', text('المشاركة تُناقَش بحسب طبيعة المشروع وتوفر المؤدية وموافقتها.', 'Participation depends on the project, the performer’s availability and agreement.')));
    person.append(crop, bio);
    const samples = node('div', 'collaborator-samples');
    for (const sample of noor.samples) {
      const original = sample.reference ? window.PORTFOLIO_DATA?.[sample.reference.collection]?.find(w => w.id === sample.reference.id) : null;
      const card = node('article', 'collaborator-sample');
      card.dataset.sample = sample.id;
      const imageLink = link('', original?.url || sample.url, 'collaborator-cover');
      imageLink.setAttribute('aria-label', field(sample, 'watch') + ': ' + field(sample, 'title'));
      const image = node('img');
      image.src = original?.image || sample.image;
      image.alt = field(sample, 'title');
      image.loading = 'lazy';
      image.width = 1440;
      image.height = 810;
      imageLink.append(image);
      const copy = node('div', 'collaborator-sample-copy');
      copy.append(node('p', 'collaborator-label', field(sample, 'badge')), node('h4', '', field(sample, 'title')), node('p', '', field(sample, 'description')));
      copy.append(node('p', 'collaborator-credit', original ? field(original, 'detail') || field(sample, 'credit') : field(sample, 'credit')));
      copy.append(link(field(sample, 'watch') + ' ↗', original?.url || sample.url, 'collaborator-watch'));
      card.append(imageLink, copy);
      samples.append(card);
    }
    profile.append(person, samples);
    content.append(profile);
    mount.append(content);
  }
  window.renderCollaboratorLanguage = render;
  render();
})();

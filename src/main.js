/* Hall Of Flowers - behaviour. Content lives in assets/js/data.js */
(() => {
  'use strict';
  const init = () => {
  const D = window.HOF_DATA;
  if (!D) return;
  const B = D.business;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const IMG = 'assets/img/';

  /* ---------- helpers ---------- */
  function pic(id, alt, sizes, lazy = true) {
    const m = D.images[id];
    const ws = m.w;
    const w0 = ws[0];
    const srcset = ws.map((w) => `${IMG}${id}-${w}.webp ${w}w`).join(', ');
    return `<img src="${IMG}${id}-${w0}.webp" srcset="${srcset}" sizes="${sizes}" width="${w0}" height="${Math.round(w0 / m.ratio)}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
  }
  const t12 = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    const ap = h >= 12 ? 'pm' : 'am';
    return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''}${ap}`;
  };

  /* ---------- simple bindings (contact details) ---------- */
  const text = { phone: B.phone.display, email: B.email, igHandle: B.instagram.handle };
  const href = { tel: 'tel:' + B.phone.tel, mailto: 'mailto:' + B.email, instagram: B.instagram.url, facebook: B.facebook.url };
  $$('[data-bind]').forEach((el) => { if (text[el.dataset.bind]) el.textContent = text[el.dataset.bind]; });
  $$('[data-bind-href]').forEach((el) => { if (href[el.dataset.bindHref]) el.setAttribute('href', href[el.dataset.bindHref]); });
  $('#yr').textContent = new Date().getFullYear();

  /* address + directions */
  const a = B.address;
  $('#addr').innerHTML = a.lines.map(esc).join('<br>') + '<br>' + esc(a.postcode) +
    `<br><a href="${esc(a.mapsUrl)}" rel="noopener" target="_blank" style="display:inline-block;margin-top:10px;font:500 .8rem/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--forest);border-bottom:1px solid var(--rose);padding:12px 0 4px">Get directions</a>`;

  /* ---------- marquee ---------- */
  const mq = D.marquee.map((t) => `<span>${esc(t)}</span>`).join('');
  $('#marquee').innerHTML = mq + mq + mq + mq;

  /* ---------- services ---------- */
  $('#cards').innerHTML = D.services.map((s, i) => `
    <li class="card rv" style="--rd:${(i % 4) * 0.09}s">
      <div class="arch" data-cursor="Enquire"><span class="num">${String(i + 1).padStart(2, '0')}</span>${pic(s.image, s.alt, '(min-width:1000px) 22vw, (min-width:560px) 44vw, 90vw')}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.blurb)}</p>
      <a class="more" href="#contact" data-enquiry="${esc(s.enquiry || '')}">Enquire <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h15m-5-6 6 6-6 6"/></svg></a>
    </li>`).join('');

  /* ---------- seasonal ---------- */
  const S = D.seasonal;
  const sec = $('#workshops');
  if (S && S.show) {
    sec.hidden = false;
    $('#season-eyebrow').textContent = S.eyebrow;
    $('#season-h').textContent = S.title;
    $('#season-intro').textContent = S.intro;
    $('#season-cta').textContent = S.cta;
    $('#sessions').innerHTML = S.sessions.map((x) => `<li><span class="d"><small>${esc(x.day)}</small>${esc(x.date)}</span><span class="v"><b>${esc(x.venue)}</b>${esc(x.place)}</span></li>`).join('');
  } else {
    $$('[href="#workshops"]').forEach((el) => { (el.closest('li') || el).style.display = 'none'; });
  }

  /* ---------- gallery ---------- */
  const igSvg = `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="fp" d="M50 50m-42 0a42 42 0 1 1 84 0a42 42 0 1 1-84 0"/></defs><text style="letter-spacing:-.217px"><textPath href="#fp">Follow along · Follow along · Follow along ·</textPath></text></svg>`;
  $('#track').innerHTML = D.gallery.map((g) => `<figure class="tile ${esc(g.shape)}" data-cursor="Look">${pic(g.image, g.alt, '(min-width:900px) 34vw, 70vw')}</figure>`).join('') +
    `<a class="follow" href="${esc(B.instagram.url)}" rel="noopener" target="_blank" data-cursor="Follow">${igSvg}<span>See more on<em>Instagram</em></span></a>`;

  /* ---------- about ---------- */
  const A = D.about;
  $('#about-eyebrow').textContent = A.eyebrow;
  $('#about-h').innerHTML = A.title;
  $('#about-body').innerHTML = A.paragraphs.map((p) => `<p style="margin-bottom:16px">${esc(p)}</p>`).join('');
  $('#facts').innerHTML = A.facts.map((f) => `<div><b>${esc(f.big)}</b><span>${esc(f.small)}</span></div>`).join('');
  const star = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 2.9 6.9 7.1.6-5.4 4.7 1.7 7.1L12 17.6 5.7 21.3l1.7-7.1L2 9.5l7.1-.6z"/></svg>';
  $('#reviews').innerHTML = D.reviews.map((r, i) => `<blockquote class="rv" style="--rd:${i * 0.1}s"><div class="stars" role="img" aria-label="5 out of 5 stars">${star.repeat(5)}</div>${esc(r.quote)}<footer>${esc(r.by)}</footer></blockquote>`).join('');

  /* ---------- enquiry select ---------- */
  const sel = $('#enquiry');
  D.enquiryOptions.forEach((o) => sel.append(new Option(o, o)));
  document.addEventListener('click', (e) => {
    const l = e.target.closest('[data-enquiry]');
    if (l && l.dataset.enquiry) sel.value = l.dataset.enquiry;
  });

  /* ---------- hours + open state ---------- */
  const fmtDay = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  function londonNow() {
    const p = {};
    fmtDay.formatToParts(new Date()).forEach((x) => { p[x.type] = x.value; });
    return { day: p.weekday, min: +p.hour * 60 + +p.minute };
  }
  const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  function renderHours() {
    const now = londonNow();
    const days = B.hours;
    $('#hours').innerHTML = days.map((d) => `<div class="${d.day === now.day ? 'today' : ''}"><dt>${esc(d.day)}</dt><dd>${d.open ? t12(d.open) + ' – ' + t12(d.close) : 'Closed'}</dd></div>`).join('');
    const idx = days.findIndex((d) => d.day === now.day);
    const today = days[idx];
    const el = $('#openstate');
    el.classList.remove('is-open');
    if (today && today.open && now.min >= toMin(today.open) && now.min < toMin(today.close)) {
      el.classList.add('is-open');
      el.textContent = `Open now · until ${t12(today.close)}`;
      return;
    }
    if (today && today.open && now.min < toMin(today.open)) { el.textContent = `Closed · opens today at ${t12(today.open)}`; return; }
    for (let k = 1; k <= 7; k++) {
      const d = days[(idx + k) % 7];
      if (d.open) { el.textContent = `Closed · opens ${k === 1 ? 'tomorrow' : d.day} at ${t12(d.open)}`; return; }
    }
  }
  renderHours();

  /* ---------- petal menu ---------- */
  const dial = $('#dial'), menu = $('#menu'), heart = $('.heart', menu);
  const inertTargets = [$('#main'), $('footer.site'), $('header.top')];
  let isOpen = false;
  function setMenu(open) {
    if (open === isOpen) return;
    isOpen = open;
    if (open) {
      const r = dial.getBoundingClientRect();
      menu.style.setProperty('--ox', r.left + r.width / 2 + 'px');
      menu.style.setProperty('--oy', r.top + r.height / 2 + 'px');
    }
    menu.classList.toggle('open', open);
    dial.setAttribute('aria-expanded', open);
    $('#dial-label').textContent = open ? 'Close menu' : 'Menu';
    document.documentElement.style.overflow = open ? 'hidden' : '';
    inertTargets.forEach((n) => n && (n.inert = open));
    if (open) setTimeout(() => $('a', menu).focus({ preventScroll: true }), 700);
  }
  dial.addEventListener('click', () => setMenu(!isOpen));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) { setMenu(false); dial.focus(); } });
  $$('a', menu).forEach((l) => {
    l.addEventListener('click', () => setMenu(false));
  });
  $$('.wheel li', menu).forEach((li) => {
    const i = +li.style.getPropertyValue('--i');
    ['mouseenter', 'focusin'].forEach((ev) => li.addEventListener(ev, () => heart.style.setProperty('--spin', i * 60 + 30)));
  });

  /* ---------- scroll: dial progress + ring rotation ---------- */
  let ticking = false, lastY = 0;
  const topbar = $('header.top');
  function onScroll() {
    ticking = false;
    const y = scrollY;
    topbar.classList.toggle('scrolled', y > 60);
    topbar.classList.toggle('hide', y > 500 && y > lastY + 4 && !isOpen);
    if (y < lastY - 4 || y < 500) topbar.classList.remove('hide');
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    dial.style.setProperty('--prog', max > 0 ? (y / max) * 100 : 0);
    dial.style.setProperty('--rot', y * 0.22);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- reveal + touch zoom + active section ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.rv, .rv-s').forEach((el) => io.observe(el));
  if (!fine) {
    const zio = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('zoom', e.intersectionRatio > 0.55)), { threshold: [0, 0.55, 1] });
    $$('.card, .tile').forEach((el) => zio.observe(el));
  }
  const links = $$('.wheel a', menu);
  const sio = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['hero', 'services', 'workshops', 'gallery', 'about', 'contact'].forEach((id) => { const n = document.getElementById(id); if (n) sio.observe(n); });
  $$('.wheel a[href="#top"]').forEach((l) => l.setAttribute('href', '#hero'));

  /* hero line-art (generated file, drawn in once everything else is loaded) */
  const art = document.createElement('script');
  art.src = 'assets/js/botanical.js';
  document.head.append(art);

  /* ---------- hero: orbiting photos (added after load so the hero image loads first) ---------- */
  const orbEl = $('#orb');
  orbEl.insertAdjacentHTML('beforeend',
    `<div class="sat"><span>${pic('g3', '', '120px')}</span></div><div class="sat b"><span>${pic('g10', '', '100px')}</span></div>`);

  /* ---------- hero: petals + parallax ---------- */
  if (!reduce) {
    const wrap = $('#petals');
    let h = '';
    for (let i = 0; i < 9; i++) {
      h += `<i class="petal" style="--x:${(Math.random() * 100).toFixed(1)}%;--s:${(8 + Math.random() * 12).toFixed(0)}px;--t:${(14 + Math.random() * 14).toFixed(1)}s;--dl:-${(Math.random() * 24).toFixed(1)}s;--dx:${(Math.random() * 240 - 120).toFixed(0)}px"></i>`;
    }
    wrap.innerHTML = h;
    if (fine) {
      const orb = $('#orb');
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const loop = () => {
        cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
        orb.style.setProperty('--px', cx.toFixed(3)); orb.style.setProperty('--py', cy.toFixed(3));
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0;
      };
      $('#hero').addEventListener('pointermove', (e) => {
        tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
    }
  }

  /* ---------- cursor ---------- */
  if (fine) {
    const c = $('#cursor');
    let x = 0, y = 0, tx = 0, ty = 0, run = false;
    const tick = () => { x += (tx - x) * 0.22; y += (ty - y) * 0.22; c.style.transform = `translate3d(${x}px,${y}px,0)`; run = Math.abs(tx - x) + Math.abs(ty - y) > 0.3; if (run) requestAnimationFrame(tick); };
    addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; c.classList.add('on'); if (!run) { run = true; requestAnimationFrame(tick); } }, { passive: true });
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor]');
      c.classList.toggle('big', !!t);
      c.textContent = t ? t.dataset.cursor : '';
    });
    document.documentElement.addEventListener('mouseleave', () => c.classList.remove('on'));
  }

  /* ---------- gallery controls + drag ---------- */
  const track = $('#track');
  const step = () => Math.max(260, track.clientWidth * 0.7);
  $('#gprev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#gnext').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') track.scrollBy({ left: 200, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') track.scrollBy({ left: -200, behavior: 'smooth' });
  });
  if (fine) {
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', (e) => { if (e.button !== 0) return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add('drag'); }
      if (moved) track.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => { down = false; track.classList.remove('drag'); });
    track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); moved = false; } }, true);
    track.addEventListener('dragstart', (e) => e.preventDefault());
  }

  /* ---------- map (loads when near viewport) ---------- */
  const map = $('#map');
  function loadMap() {
    const f = document.createElement('iframe');
    f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(a.embedQuery) + '&hl=en-GB&z=16&output=embed';
    f.title = 'Map showing the location of Hall Of Flowers, 23 The Service Road, Potters Bar';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.allowFullscreen = true;
    f.addEventListener('load', () => { const p = $('.ph', map); if (p) p.remove(); });
    map.prepend(f);
  }
  if ('IntersectionObserver' in window) {
    const mo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { loadMap(); mo.disconnect(); } }, { rootMargin: '400px' });
    mo.observe(map);
  }

  /* ---------- form (Formspree) ---------- */
  const form = $('#form'), status = $('#status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (form.elements._gotcha.value) { status.textContent = 'Thank you!'; return; }
    const btn = $('button[type=submit]', form);
    btn.disabled = true;
    status.className = 'status';
    status.textContent = 'Sending…';
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error('bad status');
      form.reset();
      status.className = 'status ok';
      status.textContent = 'Thank you - your message is on its way. We will be in touch very soon.';
    } catch (err) {
      status.className = 'status err';
      status.innerHTML = `Sorry, that did not send. Please email <a href="mailto:${esc(B.email)}" style="text-decoration:underline">${esc(B.email)}</a> or call ${esc(B.phone.display)}.`;
    } finally { btn.disabled = false; }
  });
  };
  // run after first paint + load so it never competes with the hero for the main thread
  if (document.readyState === 'complete') setTimeout(init, 0);
  else addEventListener('load', () => setTimeout(init, 0));
})();

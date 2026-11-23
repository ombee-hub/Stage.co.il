// במה חדשה — shared header/footer + small interactions
(function () {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} }
  };
  const saved = store.get('bama-theme');
  if (saved) document.documentElement.dataset.theme = saved;

  const page = document.body.dataset.page || '';
  const nav = [
    ['about.html', 'אודות', 'about'],
    ['category.html', 'מלל', 'text'], ['cat-2.html', 'ויז׳ואל', 'visual'],
    ['cat-3.html', 'סאונד', 'sound'], ['cat-4.html', 'קול־נוע', 'film'],
    ['yotzrim.html', 'יוצרים', 'authors']
  ];
  const logo = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M4 32h32" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M20 4 9 30h22z" fill="var(--spot)" opacity=".35"/><circle cx="20" cy="6" r="3.2" fill="var(--accent)"/><rect x="15" y="22" width="10" height="10" rx="5" fill="currentColor"/></svg>`;
  const icon = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  const links = nav.map(([h, t, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ''}>${t}</a>`).join('');

  const header = document.getElementById('site-header');
  if (header) header.outerHTML = `
  <header class="site-header">
    <div class="wrap header-row">
      <a class="logo" href="index.html"><img class="logo-img" src="images/white-logo.webp" alt="במה חדשה – stage.co.il" width="246" height="121"></a>
      <nav class="main-nav" aria-label="ראשי">${links}</nav>
      <div class="header-tools">
        <form class="search-box" role="search" action="#"><label class="sr-only" for="q">חיפוש</label>
          <input id="q" type="search" placeholder="חיפוש יצירות ויוצרים">${icon.search}</form>
        <button class="icon-btn" id="theme-btn" aria-label="מצב כהה/בהיר">${icon.moon}</button>
        <a class="btn btn-ghost" href="#">התחברות</a>
        <a class="btn btn-primary" href="submit.html">פרסמו יצירה</a>
        <button class="icon-btn menu-btn" id="menu-btn" aria-label="תפריט" aria-expanded="false">${icon.menu}</button>
      </div>
    </div>
    <div class="wrap mobile-nav" id="mobile-nav" data-open="false">${links}<a href="#">התחברות</a><a href="submit.html">פרסמו יצירה</a>
      <input type="search" placeholder="חיפוש יצירות ויוצרים" aria-label="חיפוש"></div>
  </header>`;

  const footer = document.getElementById('site-footer');
  if (footer) footer.outerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div><a class="logo" href="index.html"><img class="logo-img logo-img-lg" src="images/white-logo.webp" alt="במה חדשה – stage.co.il" width="246" height="121"></a>
          <p>המאגר המקוון הגדול בעולם ליצירה עברית. הפינה שלכם ברשת, שבה גם היצירות שלכם יכולות לצאת מהמגירה אל האור.</p></div>
        <div><h4>מדורים</h4><ul><li><a href="category.html">מלל</a></li><li><a href="cat-2.html">ויז׳ואל</a></li><li><a href="cat-3.html">סאונד</a></li><li><a href="cat-4.html">קול־נוע</a></li><li><a href="stories-new50detail1.html">יצירות חדשות</a></li></ul></div>
        <div><h4>קהילה</h4><ul><li><a href="yotzrim.html">יוצרים</a></li><li><a href="favs.html">המלצות המערכת</a></li><li><a href="res.html">תגובות אחרונות</a></li><li><a href="nights.html">ערבי במה</a></li><li><a href="moled.html">הוציאו לאור</a></li><li><a href="http://stage.co.il/forum" rel="noopener">פורומים</a></li></ul></div>
        <div><h4>במה</h4><ul><li><a href="about.html">אודות</a></li><li><a href="submit.html">איך שולחים יצירה?</a></li><li><a href="http://stage.co.il/faq.html" rel="noopener">שאלות נפוצות</a></li><li><a href="mailus.html">צרו קשר</a></li><li><a href="donate.html">תמכו בבמה</a></li></ul></div>
      </div>
      <div class="fine"><span>© 1998–2026 במה חדשה. זכויות היצירות שמורות ליוצריהן.</span><span>האתר מכיל תכנים למבוגרים. הגיל המומלץ לגלישה: 18+.</span>
        <span class="credit">עיצוב ובנייה ע״י <a href="#" aria-label="OMBee – Graphic Design and UI/UX"><img src="images/ombee-logo.webp" alt="OMBee" width="91" height="26"></a></span></div>
    </div>
  </footer>`;

  document.getElementById('theme-btn')?.addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next; store.set('bama-theme', next);
  });
  const mb = document.getElementById('menu-btn'), mn = document.getElementById('mobile-nav');
  mb?.addEventListener('click', () => {
    const open = mn.dataset.open !== 'true';
    mn.dataset.open = open; mb.setAttribute('aria-expanded', open);
  });

  // Reading progress + font size
  const bar = document.querySelector('.progress'), prose = document.querySelector('.prose');
  if (bar && prose) addEventListener('scroll', () => {
    const r = prose.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight * .6)));
    bar.style.width = (p * 100) + '%';
  }, { passive: true });
  document.querySelectorAll('[data-size]').forEach(b => b.addEventListener('click', () => {
    const cur = parseFloat(getComputedStyle(prose).fontSize);
    prose.style.setProperty('--read-size', Math.min(28, Math.max(16, cur + Number(b.dataset.size))) + 'px');
  }));

  // Tabs / filter chips
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = list.querySelectorAll('[role="tab"]');
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.setAttribute('aria-selected', x === t));
      const f = t.dataset.filter;
      document.querySelectorAll('[data-type]').forEach(li => li.hidden = f !== 'all' && li.dataset.type !== f);
    }));
  });
  document.querySelectorAll('.chips').forEach(group => {
    const chips = group.querySelectorAll('.chip');
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.setAttribute('aria-pressed', x === c));
      const f = c.dataset.filter;
      document.querySelectorAll('[data-type]').forEach(li => li.hidden = f !== 'all' && li.dataset.type !== f);
    }));
  });
})();

/* Thailandia Expedition: pezzi condivisi fra tutte le pagine */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     ICONE (tratto 1.7, stile unico per tutto il sito)
     ============================================================ */
  const P = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS = {
    home:      P('<path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6h-4v6H5a1 1 0 01-1-1v-9z"/>'),
    route:     P('<circle cx="6" cy="5" r="2.2"/><circle cx="18" cy="19" r="2.2"/><path d="M8.2 5H15a3.5 3.5 0 010 7H9a3.5 3.5 0 000 7h6.8"/>'),
    plane:     P('<path d="M10.5 13.5L3 11l1.6-1.6 7.4.9 4.6-4.6a2 2 0 012.8 2.8l-4.6 4.6.9 7.4L18 22l-2.5-7.5"/><path d="M6 18l2-2"/>'),
    cash:      P('<rect x="2.5" y="6" width="19" height="12" rx="1.5"/><circle cx="12" cy="12" r="3"/><path d="M6 9.5v5M18 9.5v5"/>'),
    pack:      P('<path d="M6 9a6 6 0 0112 0v11a1 1 0 01-1 1H7a1 1 0 01-1-1V9z"/><path d="M9 21v-6h6v6M9.5 3.6L9 2m5.5 1.6L15 2M6 13h12"/>'),
    pin:       P('<path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    faq:       P('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 114 2c-.8.6-1.5 1-1.5 2m0 3v.01"/>'),
    dots:      P('<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>'),
    /* mezzi */
    van:       P('<path d="M2.5 16.5V8a2 2 0 012-2h10l4.5 4.5h.5a2 2 0 012 2v4"/><path d="M2.5 11h17M9 6v5"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>'),
    auto:      P('<path d="M4 16.5v-4l2-5h12l2 5v4"/><path d="M4 12.5h16"/><circle cx="7.5" cy="17" r="1.8"/><circle cx="16.5" cy="17" r="1.8"/>'),
    volo:      P('<path d="M10.5 13.5L3 11l1.6-1.6 7.4.9 4.6-4.6a2 2 0 012.8 2.8l-4.6 4.6.9 7.4L18 22l-2.5-7.5"/><path d="M6 18l2-2"/>'),
    traghetto: P('<path d="M3 14.5h18l-2.5 4.5h-13z"/><path d="M6 14.5V10h12v4.5M9 10V7h5v3M11 7V4.5"/><path d="M2 21.5c1.5 0 1.5-.8 3-.8s1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8"/>'),
    speedboat: P('<path d="M2 15h14.5l5-5H11l-3 3H4z"/><path d="M11 10l1.5-3h3"/><path d="M2 19.5c1.5 0 1.5-.8 3-.8s1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8"/>'),
    treno:     P('<rect x="5.5" y="3" width="13" height="13.5" rx="3"/><path d="M5.5 10h13M9 20l-2 2M15 20l2 2M9 13.5h.01M15 13.5h.01M10 6h4"/>'),
    /* letti */
    hotel:     P('<path d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 00-3-3h-7v6"/><circle cx="7" cy="11" r="1.8"/>'),
    homestay:  P('<path d="M3 11l9-7 9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/><path d="M2 20h20"/>'),
    tenda:     P('<path d="M12 4L2.5 20h19z"/><path d="M12 4l-3 16M12 4l3 16"/><path d="M1.5 20h21"/>'),
    /* pasti */
    colazione: P('<path d="M4 9h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5V9z"/><path d="M17 11h1.5a2.5 2.5 0 010 5H16.5M8 3.5c-.6.8-.6 1.7 0 2.5M12 3.5c-.6.8-.6 1.7 0 2.5"/>'),
    pranzo:    P('<path d="M3.5 12h17a8.5 8.5 0 01-17 0z"/><path d="M15 3l-4 7M19 4l-6 6"/>'),
    cena:      P('<path d="M19 14.5A8 8 0 019.5 5a8 8 0 1010.1 10.1z" transform="translate(-1 0)"/><path d="M18 3v3M16.5 4.5h3"/>'),
    luna:      P('<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>'),
    alert:     P('<path d="M12 3.5L2.5 20h19z"/><path d="M12 10v4.5M12 17.5v.01"/>'),
    info:      P('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>'),
    ext:       P('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>'),
  };
  ICONS.barca = ICONS.speedboat;
  /* il fiore prajam yam, usato come fregio */
  const FIORE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1c2 3 2 7 0 11c-2-4-2-8 0-11zM12 23c2-3 2-7 0-11c-2 4-2 8 0 11zM1 12c3-2 7-2 11 0c-4 2-8 2-11 0zM23 12c-3-2-7-2-11 0c4 2 8 2 11 0z"/><circle cx="12" cy="12" r="1.6" fill="var(--lacca, #110c09)"/></svg>';

  /* ============================================================
     DATE E NUMERI
     ============================================================ */
  const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  const GG = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  const CIFRE_THAI = "๐๑๒๓๔๕๖๗๘๙";

  const UI = {
    ICONS, FIORE,
    icon: (k) => ICONS[k] || "",
    esc: (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])),
    /* 13 → "๑๓" */
    thai: (n) => String(n).replace(/\d/g, (d) => CIFRE_THAI[d]),
    /* "2026-10-31" → Date locale a mezzogiorno (niente scherzi di fuso) */
    giorno: (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d, 12); },
    dataLunga: (iso) => { const d = UI.giorno(iso); return `${GG[d.getDay()]} ${d.getDate()} ${MESI[d.getMonth()]}`; },
    dataBreve: (iso) => { const d = UI.giorno(iso); return `${GG[d.getDay()].slice(0, 3)} ${d.getDate()} ${MESI[d.getMonth()].slice(0, 3)}`; },
    meseAnno: (iso) => { const d = UI.giorno(iso); return `${d.getDate()} ${MESI[d.getMonth()]} ${d.getFullYear()}`; },
    day: (n) => TRIP.giorni.find((g) => g.n === n),
    atto: (n) => TRIP.atti.find((a) => a.n === n),
    nf: new Intl.NumberFormat("it-IT", { useGrouping: "always" }),
    reduce,
    /* inizio del viaggio: primo volo se noto, altrimenti mezzanotte del Day 1 a Bangkok */
    inizio: () => new Date(TRIP.primoVolo || `${TRIP.partenza}T00:00:00+07:00`).getTime(),
    fine: () => new Date(`${TRIP.rientro}T23:59:00+07:00`).getTime(),
    /* in che giorno del viaggio siamo (ora di Bangkok), oppure null */
    oggiDay: () => {
      const bkk = new Date(Date.now() + 7 * 36e5);
      const iso = bkk.toISOString().slice(0, 10);
      const g = TRIP.giorni.find((x) => x.data === iso);
      return g ? g.n : null;
    },
    credito: (file) => (typeof FOTO_CREDITI !== "undefined" ? FOTO_CREDITI.find((c) => c.f === file) : null),
  };
  window.UI = UI;

  /* ============================================================
     NAVIGAZIONE: una sola fonte per pill desktop, tab bar e sheet
     ============================================================ */
  const NAV = [
    { href: "index.html",      page: "home",       label: "Home",       icon: "home",  tab: true,  desc: "Countdown, la linea, la crew" },
    { href: "itinerario.html", page: "itinerario", label: "Itinerario", icon: "route", tab: true,  desc: "13 giorni in tre atti" },
    { href: "logistica.html",  page: "logistica",  label: "Viaggio & notti", short: "Logistica", icon: "plane", tab: false, desc: "Voli, treno notturno, dove si dorme" },
    { href: "cassa.html",      page: "cassa",      label: "Cassa",      icon: "cash",  tab: false, desc: `${TRIP.cassa.quota} € a testa, cosa copre` },
    { href: "zaino.html",      page: "zaino",      label: "Zaino",      icon: "pack",  tab: true,  desc: "La checklist che si salva da sola" },
    { href: "mappe.html",      page: "mappe",      label: "Mappa",      icon: "pin",   tab: true,  desc: "Ogni tempio, molo e spiaggia" },
    { href: "faq.html",        page: "faq",        label: "Regole & FAQ", short: "FAQ", icon: "faq", tab: false, desc: "Visto, baht, templi, truffe, frasi utili" },
  ];

  const header = document.querySelector("header.nav");
  const page = header ? header.dataset.page : "";

  if (header) {
    const giorniMancanti = Math.ceil((UI.inizio() - Date.now()) / 864e5);
    const oggi = UI.oggiDay();
    const chip = oggi
      ? `<a class="nav-chip" href="itinerario.html#day-${oggi}" title="Il giorno di oggi"><b>D${oggi}</b><span>oggi</span></a>`
      : giorniMancanti > 0
        ? `<a class="nav-chip" href="index.html#partenza" title="Giorni alla partenza"><b>${giorniMancanti}</b><span>giorni</span></a>`
        : "";

    header.innerHTML = `
      <div class="nav-inner">
        <a class="nav-brand" href="index.html" aria-label="Thailandia Expedition, home">
          <span class="sigillo" aria-hidden="true">ไทย</span>
          <span class="nb-txt"><strong>Thailandia</strong><small>${TRIP.code}</small></span>
        </a>
        <nav class="nav-pill" aria-label="Navigazione principale">
          ${NAV.map((n) => `<a href="${n.href}" ${n.page === page ? 'class="active" aria-current="page"' : ""}><i>${ICONS[n.icon]}</i><span>${n.short || n.label}</span></a>`).join("")}
        </nav>
        ${chip}
      </div>`;

    const tabs = NAV.filter((n) => n.tab);
    const altre = NAV.filter((n) => !n.tab);
    const altraAttiva = altre.some((n) => n.page === page);

    const tabbar = document.createElement("nav");
    tabbar.className = "tabbar";
    tabbar.setAttribute("aria-label", "Navigazione rapida");
    tabbar.innerHTML =
      tabs.map((n) => `<a class="tab ${n.page === page ? "active" : ""}" href="${n.href}" ${n.page === page ? 'aria-current="page"' : ""}><i>${ICONS[n.icon]}</i><span>${n.label}</span></a>`).join("") +
      `<button class="tab tab-more ${altraAttiva ? "active" : ""}" type="button" aria-expanded="false" aria-controls="navSheet"><i>${ICONS.dots}</i><span>Altro</span></button>`;

    const backdrop = document.createElement("div");
    backdrop.className = "sheet-backdrop";
    const sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.id = "navSheet";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-modal", "true");
    sheet.setAttribute("aria-label", "Altre sezioni");
    sheet.innerHTML = `
      <div class="sheet-grab" aria-hidden="true"></div>
      <p class="sheet-title">Altre sezioni</p>
      ${altre.map((n) => `
        <a class="sheet-row ${n.page === page ? "active" : ""}" href="${n.href}">
          <i>${ICONS[n.icon]}</i>
          <span class="sr-txt"><b>${n.label}</b><small>${n.desc}</small></span>
          <svg class="sr-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
        </a>`).join("")}`;

    document.body.append(tabbar, backdrop, sheet);
    document.body.classList.add("has-tabbar");

    const more = tabbar.querySelector(".tab-more");
    const setSheet = (open) => {
      sheet.classList.toggle("open", open);
      backdrop.classList.toggle("open", open);
      more.setAttribute("aria-expanded", open);
      document.body.classList.toggle("sheet-lock", open);
      if (open) sheet.querySelector(".sheet-row").focus({ preventScroll: true });
    };
    more.addEventListener("click", () => setSheet(!sheet.classList.contains("open")));
    backdrop.addEventListener("click", () => setSheet(false));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") setSheet(false); });
  }

  /* ============================================================
     FOOTER (con i crediti delle foto)
     ============================================================ */
  const main = document.querySelector("main");
  if (main && !document.querySelector(".piede")) {
    const f = document.createElement("footer");
    f.className = "piede";
    const crediti = typeof FOTO_CREDITI !== "undefined" ? FOTO_CREDITI : [];
    f.innerHTML = `
      <div class="wrap piede-in">
        <div class="fregio" style="margin:0">${FIORE}</div>
        <p><b>${TRIP.titolo}</b> · ${TRIP.code} · turno dal ${UI.dataLunga(TRIP.partenza)} al ${UI.meseAnno(TRIP.rientro)}</p>
        <p>Con ${TRIP.coordinatore.nome}, ${TRIP.coordinatore.ruolo.toLowerCase()}. Sito fatto per il gruppo: le informazioni ufficiali restano quelle di WeRoad.</p>
        ${crediti.length ? `<details><summary>Crediti delle foto</summary><ul>${crediti.map((c) => `<li>${c.f.replace(/\.jpg$/, "")}: ${UI.esc(c.a)}, ${c.l}, via Wikimedia Commons</li>`).join("")}</ul></details>` : ""}
      </div>`;
    main.after(f);
  }

  /* fregi dichiarati nell'HTML con <div class="fregio"></div> */
  document.querySelectorAll(".fregio:empty").forEach((el) => { el.innerHTML = FIORE; el.setAttribute("aria-hidden", "true"); });

  /* ============================================================
     REVEAL (con stagger per i figli di .stagger)
     ============================================================ */
  UI.osserva = (root = document) => {
    root.querySelectorAll(".stagger").forEach((g) => Array.from(g.children).forEach((c, i) => c.style.setProperty("--i", Math.min(i, 8))));
    /* a scheda nascosta l'observer non scatta mai: si mostra tutto subito */
    if (reduce || document.hidden || !("IntersectionObserver" in window)) {
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => UI.osserva());
  else UI.osserva();

  /* ============================================================
     COUNTDOWN in due alfabeti
     ============================================================ */
  UI.countdown = (host) => {
    if (!host) return;
    const unita = [
      { k: "g", l: "giorni", t: "วัน" },
      { k: "h", l: "ore", t: "ชั่วโมง" },
      { k: "m", l: "minuti", t: "นาที" },
      { k: "s", l: "secondi", t: "วินาที" },
    ];
    const box = host.querySelector(".cifre");
    box.innerHTML = unita.map((u) => `
      <div class="cifra"><b data-u="${u.k}">00</b><span class="thai" data-t="${u.k}"></span><span>${u.l} · ${u.t}</span></div>`).join("");
    const el = {};
    unita.forEach((u) => { el[u.k] = box.querySelector(`[data-u="${u.k}"]`); el["t" + u.k] = box.querySelector(`[data-t="${u.k}"]`); });
    const titolo = host.querySelector("[data-conto-titolo]");
    const sub = host.querySelector("[data-conto-sub]");

    const tick = () => {
      const diff = UI.inizio() - Date.now();
      if (diff <= 0) {
        host.classList.add("finito");
        const oggi = UI.oggiDay();
        if (oggi && titolo) { titolo.innerHTML = `Siamo in viaggio: <em>Day ${oggi}</em>`; sub.innerHTML = `<a href="itinerario.html#day-${oggi}">Il programma di oggi →</a>`; }
        else if (Date.now() > UI.fine() && titolo) { titolo.innerHTML = "Il viaggio è finito. <em>ขอบคุณ</em>, grazie."; sub.textContent = ""; }
        return false;
      }
      const g = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
      const v = { g, h, m, s };
      Object.keys(v).forEach((k) => {
        const txt = k === "g" ? String(v[k]) : String(v[k]).padStart(2, "0");
        if (el[k].textContent !== txt) { el[k].textContent = txt; el["t" + k].textContent = UI.thai(txt); }
      });
      return true;
    };
    if (tick()) setInterval(tick, 1000);
  };
})();

/* Itinerario: i 13 giorni divisi in tre atti, tutto letto da data.js */
(function () {
  "use strict";
  const { esc, thai, icon } = UI;
  const ROMANI = ["", "I", "II", "III"];
  const PASTI = { colazione: "Colazione", pranzo: "Pranzo", cena: "Cena" };
  const MEZZI = { van: "Van", auto: "Auto", volo: "Volo", traghetto: "Traghetto", speedboat: "Speedboat", barca: "Barca", treno: "Treno" };
  const TIPO = { incluso: "Incluso", cassa: "Cassa comune", extra: "A parte" };

  const letto = (g) => {
    if (!g.letto) return `<span class="chip letto">${icon("luna")}Fine del viaggio</span>`;
    const txt = {
      hotel: `Notte a ${g.luogo}`,
      homestay: "Notte in homestay",
      treno: "Notte in treno",
    }[g.letto];
    return `<span class="chip letto">${icon(g.letto === "treno" ? "treno" : g.letto)}${esc(txt)}</span>`;
  };

  const foto = (g) => {
    if (!g.foto) return "";
    const c = UI.credito(g.foto);
    return `
      <figure class="g-foto cornice">
        <img src="assets/img/${g.foto}" alt="${esc(g.titolo)}" loading="lazy">
        ${c ? `<span class="fcred">${esc(c.a)} · ${c.l}</span>` : ""}
      </figure>`;
  };

  const biglietto = (g) => `
    <div class="biglietto" role="img" aria-label="Biglietto del treno notturno da Surat Thani a Bangkok">
      <div class="b-main">
        <div class="b-top"><b>Treno notturno</b><span class="thai">รถไฟ</span></div>
        <div class="b-tratta">
          <div><small>Da</small><strong>Surat Thani</strong><span class="thai">สุราษฎร์ธานี</span></div>
          ${icon("treno")}
          <div><small>A</small><strong>Bangkok</strong><span class="thai">กรุงเทพฯ</span></div>
        </div>
        <div class="b-campi">
          <div><small>Data</small><b>${UI.dataBreve(g.data)}</b></div>
          <div><small>Partenza</small><b>in serata</b></div>
          <div><small>Arrivo</small><b>verso le 7:00</b></div>
        </div>
        <p class="b-nota">Se il treno non ha posti, WeRoad lo sostituisce con un bus notturno: stesso arrivo la mattina, meno poesia.</p>
      </div>
      <div class="b-stub" aria-hidden="true"><b>${thai(g.n)}</b><small>Day ${g.n}<br>notte a bordo</small></div>
    </div>`;

  const giorno = (g) => {
    const oggi = UI.oggiDay() === g.n;
    const pasti = g.pasti.map((p) => `<span class="chip">${icon(p)}${PASTI[p]}</span>`).join("");

    const spost = g.trasferimenti.length ? `
      <div class="g-blocco">
        <h4>Spostamenti</h4>
        <ul class="spost">${g.trasferimenti.map((t) => `
          <li>
            ${icon(t.mezzo)}
            <span class="sp-tr">${esc(t.da)}<span class="arr">→</span><b>${esc(t.a)}</b></span>
            <span class="sp-dur">${esc(MEZZI[t.mezzo])} · ${esc(t.durata)}</span>
            ${t.tipo !== "incluso" ? `<span class="badge ${t.tipo}">${TIPO[t.tipo]}</span>` : ""}
            ${t.nota ? `<span class="sp-nota">${t.nota}</span>` : ""}
          </li>`).join("")}
        </ul>
      </div>` : "";

    const att = g.attivita.length ? `
      <div class="g-blocco">
        <h4>Il programma</h4>
        <ul class="att">${g.attivita.map((a) => `
          <li class="${a.tipo}">
            <div class="a-top"><b>${esc(a.nome)}</b><span class="badge ${a.tipo}">${TIPO[a.tipo]}</span>${a.chi ? `<span class="badge solo">Solo ${esc(a.chi)}</span>` : ""}</div>
            ${a.nota ? `<p>${a.nota}</p>` : ""}
          </li>`).join("")}
        </ul>
      </div>` : "";

    const consigli = g.consigli.length ? `
      <div class="g-blocco">
        <h4>Da sapere</h4>
        <ul class="consigli">${g.consigli.map((c) => `<li>${c}</li>`).join("")}</ul>
      </div>` : "";

    const attenz = g.attenzione ? `<div class="g-blocco"><div class="attenzione">${icon("alert")}<p>${g.attenzione}</p></div></div>` : "";

    return `
      <article class="giorno reveal" id="day-${g.n}" data-atto="${g.atto}">
        <div class="g-num">
          <span class="thai oro" aria-hidden="true">${thai(g.n)}</span>
          <div class="g-meta">
            <span class="tag">Day ${String(g.n).padStart(2, "0")}${oggi ? " · oggi" : ""}</span>
            <time datetime="${g.data}">${UI.dataLunga(g.data)}</time>
          </div>
        </div>
        <div class="g-body">
          <h3>${esc(g.titolo)}</h3>
          <div class="g-chips">${letto(g)}${pasti}</div>
          ${g.hotel ? `<p class="g-hotel">${icon(g.letto === "homestay" ? "homestay" : "hotel")}<span><b>${esc(g.hotel.nome)}</b>${g.hotel.indirizzo ? `<small>${esc(g.hotel.indirizzo)}</small>` : ""}${g.hotel.checkin ? `<small>Check-in ${esc(g.hotel.checkin)}</small>` : ""}</span></p>` : ""}
          <p class="g-lead">${g.lead}</p>
          ${foto(g)}
          ${spost}
          ${att}
          ${consigli}
          ${attenz}
          ${g.letto === "treno" ? biglietto(g) : ""}
        </div>
      </article>`;
  };

  /* la notte di Halloween, incastonata subito dopo il Day 1 */
  const halloween = () => {
    const H = TRIP.halloween;
    if (!H) return "";
    return `
      <aside class="hallo reveal" id="halloween" aria-label="La notte di Halloween">
        <span class="hallo-phi" aria-hidden="true">ผี</span>
        <div class="hallo-head">
          <span class="tag">Speciale Day 1 · sabato 31 ottobre</span>
          <h3>La notte di <em>Halloween</em></h3>
          <p>La prima sera del viaggio cade proprio il 31 ottobre, ed è sabato. A Bangkok la festa si fa in strada, e la strada è <b>Khao San Road</b>. Si arriva stanchi dal volo, ma questa non si salta.</p>
        </div>
        <ol class="hallo-sera">${H.serata.map((x) => `
          <li><span class="h-ora">${esc(x.ora)}</span><b>${esc(x.cosa)}</b><span class="h-nota">${esc(x.nota)}</span></li>`).join("")}
        </ol>
        <p class="hallo-mini">Orari indicativi: fisso è solo lo SkyWalk, il resto lo decidiamo insieme.</p>
        <div class="hallo-ghost">
          <h4>Il dress code: un fantasma thai</h4>
          <div class="hallo-grid">${H.fantasmi.map((f) => `
            <div><span class="thai">${f.thai}</span><b>${esc(f.nome)}</b><p>${esc(f.d)}</p></div>`).join("")}
          </div>
        </div>
        <ul class="hallo-regole">
          <li><b>Niente costumi da monaco</b> e niente che prenda in giro la famiglia reale o il Buddha: qui non fanno ridere nessuno.</li>
          <li><b>Telefono e portafoglio davanti</b>: nella folla di Khao San i borseggiatori lavorano bene.</li>
          <li><b>Si beve da bicchieri chiusi</b> e si torna in hotel insieme.</li>
        </ul>
      </aside>`;
  };

  const NASTRI = [
    ["#ff5d8f", 118], ["#ffd23f", 84], ["#3ddc84", 132], ["#3aa0ff", 96], ["#ff8a3d", 112], ["#f3eadb", 72],
  ];

  const host = document.getElementById("atti-it");
  host.innerHTML = TRIP.atti.map((a) => {
    const giorni = TRIP.giorni.filter((g) => g.atto === a.n);
    return `
      <section class="atto" data-atto="${a.n}" id="atto-${a.n}">
        ${a.n === 2 ? `<div class="nastri" aria-hidden="true">${NASTRI.map(([c, h], i) => `<span style="--c:${c};--h:${h}px;--i:${i}"></span>`).join("")}</div>` : ""}
        <div class="wrap">
          <header class="atto-head reveal">
            <span class="tag">Atto ${ROMANI[a.n]} · Day ${a.giorni[0]} → ${a.giorni[1]}</span>
            <h2><span class="oro">${esc(a.nome)}</span> <em>${esc(a.titolo.toLowerCase())}</em></h2>
            <p>${esc(a.luoghi)}</p>
            <span class="thai-big" aria-hidden="true">${a.thai}</span>
          </header>
          ${giorni.map((g) => giorno(g) + (g.n === 1 ? halloween() : "")).join("")}
        </div>
      </section>`;
  }).join("");

  /* ---------- barra dei salti ---------- */
  const salti = document.getElementById("salti");
  salti.innerHTML = TRIP.giorni.map((g) => `<a href="#day-${g.n}" data-atto="${g.atto}" data-n="${g.n}" title="Day ${g.n} · ${esc(g.titolo)}">${thai(g.n)}</a>`).join("");

  if ("IntersectionObserver" in window) {
    const links = [...salti.querySelectorAll("a")];
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = e.target.id.replace("day-", "");
        links.forEach((l) => l.classList.toggle("on", l.dataset.n === n));
        const on = salti.querySelector(".on");
        /* scrollIntoView farebbe saltare anche la pagina: si scorre solo la barra */
        if (on) salti.scrollTo({ left: on.offsetLeft - salti.clientWidth / 2 + on.offsetWidth / 2, behavior: UI.reduce ? "auto" : "smooth" });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".giorno").forEach((el) => io.observe(el));
  }

  /* se si arriva con #day-N il browser non trova l'ancora (il contenuto nasce dal JS) */
  if (location.hash) {
    const t = document.querySelector(location.hash);
    if (t) setTimeout(() => t.scrollIntoView({ block: "start" }), 60);
  }

  UI.osserva();
})();

/* Home: linea, atti, timbri, crew, scadenze */
(function () {
  "use strict";
  const { esc, thai, icon, dataLunga } = UI;

  /* finestra del viaggio nell'hero */
  const fin = document.querySelector("[data-finestra]");
  if (fin) {
    const a = UI.giorno(TRIP.partenza), b = UI.giorno(TRIP.rientro);
    fin.textContent = `${a.getDate()} ${dataLunga(TRIP.partenza).split(" ")[2]} → ${b.getDate()} ${dataLunga(TRIP.rientro).split(" ")[2]} ${b.getFullYear()}`;
  }

  UI.countdown(document.querySelector("[data-countdown]"));

  /* ---------- LA LINEA ---------- */
  const linea = document.getElementById("linea");
  if (linea) {
    const F = TRIP.linea;
    const breve = { van: "van", volo: "volo", traghetto: "traghetto", speedboat: "speedboat", treno: "treno" };
    linea.style.setProperty("--n", F.length);
    linea.innerHTML = F.map((f, i) => {
      const next = F[i + 1];
      const capo = i === 0 || i === F.length - 1;
      const flag = "";
      return `
        <li class="fermata ${capo ? "capo" : ""}" data-atto="${f.atto}" ${f.mezzo ? `data-in="${f.mezzo}"` : ""} ${next ? `data-out="${next.mezzo}"` : ""}>
          ${f.mezzo ? `<span class="tratto">${icon(f.mezzo)}<span>${esc(f.durata || breve[f.mezzo])}</span></span>` : ""}
          <span class="nodo">${thai(i + 1)}</span>
          <span class="f-nome">${esc(f.nome)}</span>
          <span class="f-thai">${f.thai}</span>
          <span class="f-day">Day ${esc(f.day)}${flag}</span>
        </li>`;
    }).join("");
  }

  /* ---------- I TRE ATTI ---------- */
  const atti = document.getElementById("atti");
  if (atti) {
    const foto = { 1: "doi-suthep.jpg", 2: "koh-nang-yuan.jpg", 3: "wat-arun-2.jpg" };
    const roman = ["", "I", "II", "III"];
    atti.innerHTML = TRIP.atti.map((a) => `
      <a class="atto-card reveal" data-atto="${a.n}" href="itinerario.html#atto-${a.n}">
        <img src="assets/img/${foto[a.n]}" alt="" loading="lazy">
        <span class="ac-thai" aria-hidden="true">${a.thai}</span>
        <span class="tag">Atto ${roman[a.n]} · Day ${a.giorni[0]} → ${a.giorni[1]}</span>
        <h3><span class="oro">${esc(a.nome)}</span></h3>
        <b>${esc(a.titolo)}</b>
        <small>${esc(a.luoghi)}</small>
      </a>`).join("");
  }

  /* ---------- TIMBRI ---------- */
  const timbri = document.getElementById("timbri");
  if (timbri) {
    const R = 6371, rad = (x) => (x * Math.PI) / 180;
    let km = 0;
    for (let i = 1; i < ROTTA.length; i++) {
      const a = ROTTA[i - 1], b = ROTTA[i];
      const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
      km += 2 * R * Math.asin(Math.sqrt(h));
    }
    const tutti = TRIP.giorni.flatMap((g) => g.trasferimenti);
    const barche = tutti.filter((t) => t.mezzo === "traghetto" || t.mezzo === "speedboat" || t.mezzo === "barca").length;
    const voli = tutti.filter((t) => t.mezzo === "volo").length;
    const T = [
      { v: TRIP.giorni.length, l: "giorni", s: "31.10 → 12.11", f: "", c: "" },
      { v: 4, l: "capitali di quattro regni", s: "da Sukhothai a Bangkok", f: "tondo", c: "v" },
      { v: `~${UI.nf.format(Math.round(km / 100) * 100)}`, l: "km in linea d'aria", s: "Chiang Mai ↔ Golfo del Siam", f: "", c: "c" },
      { v: 1, l: "bagno con gli elefanti", s: "Day 5 · giungla", f: "ottagono", c: "l" },
      { v: voli, l: "volo interno", s: "CNX → URT", f: "tondo", c: "" },
      { v: barche, l: "traversate in barca", s: "Golfo del Siam", f: "", c: "l" },
      { v: 3, l: "soste di snorkeling", s: "Koh Tao · Day 9", f: "ottagono", c: "v" },
      { v: 1, l: "notte in treno", s: "Surat Thani → Bangkok", f: "tondo", c: "n" },
    ];
    const rot = [-3, 2, -1.5, 3.5, -2.5, 1.5, -4, 2.5];
    timbri.innerHTML = T.map((t, i) => `
      <div class="timbro reveal ${t.f} ${t.c}" style="--rot:${rot[i]}deg">
        <b>${t.v}</b><span>${esc(t.l)}</span><small>${esc(t.s)}</small>
      </div>`).join("");
  }

  /* ---------- CREW ---------- */
  const crewBox = document.getElementById("crew-box");
  if (crewBox) {
    const crew = [...TRIP.crew].sort((a, b) => (b.weroads || 0) - (a.weroads || 0));
    if (!crew.length) {
      crewBox.innerHTML = `
        <div class="attesa">
          <span class="thai" aria-hidden="true">เพื่อน</span>
          <div>
            <h3>La lista partecipanti sta arrivando</h3>
            <p>Qui compariranno i nomi del gruppo, quanti WeRoad ha fatto ognuno e chi parte per la prima volta. <span class="thai" style="font-size:1em;-webkit-text-stroke:0;color:var(--oro)">เพื่อน</span> (phuean) vuol dire amici.</p>
          </div>
        </div>`;
    } else {
      crewBox.innerHTML = `<div class="crew-grid stagger">${crew.map((p) => `
        <div class="pax reveal">
          <span class="p-ini">${esc(p.nome.split(" ").map((x) => x[0]).join("").slice(0, 2))}</span>
          <b>${esc(p.nome)}</b>
          <span class="${p.weroads > 1 ? "" : "p-first"}">${p.weroads > 1 ? `${p.weroads}° WeRoad` : "primo WeRoad"}${p.eta ? ` · ${p.eta} anni` : ""}</span>
        </div>`).join("")}</div>`;
    }
  }
  const coord = document.getElementById("coord");
  if (coord) {
    const c = TRIP.coordinatore;
    coord.innerHTML = `
      <div><span class="tag">${esc(c.ruolo)}${c.weroads ? ` · ${c.weroads} WeRoad` : ""}</span><br><b>${esc(c.nome)}</b></div>
      <q>${esc(c.motto)}</q>`;
  }

  /* ---------- PRIMA DI PARTIRE ---------- */
  const prima = document.getElementById("prima");
  if (prima) {
    /* la TDAC si compila nelle 72 ore prima dell'arrivo */
    const arrivi = TRIP.voliPax.filter((v) => v.tratta === "andata").map((v) => (v.giornoDopo ? UI.giorno(v.data).getTime() + 864e5 : UI.giorno(v.data).getTime()));
    const arrivo = arrivi.length ? new Date(Math.min(...arrivi)) : UI.giorno(TRIP.partenza);
    const apre = new Date(arrivo.getTime() - 3 * 864e5);
    const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    const d = (x) => `${x.getDate()} ${MESI[x.getMonth()]}`;
    const P = [
      {
        t: "La Digital Arrival Card",
        q: `Dal ${d(apre)}, non prima`,
        p: `È obbligatoria e si compila online nelle 72 ore prima dell'arrivo, gratis, sul <a href="https://tdac.immigration.go.th/arrival-card/#/home" target="_blank" rel="noopener">sito ufficiale dell'immigrazione</a>. Tenete l'email di conferma sul telefono. Diffidate dei siti che la fanno pagare.`,
      },
      {
        t: "Passaporto, non carta d'identità",
        q: "Valido almeno fino a maggio 2027",
        p: "Servono almeno sei mesi di validità residua. Il visto invece non serve: per una vacanza come la nostra si entra senza. Al Grand Palace il passaporto va mostrato, quindi quel giorno si porta con sé.",
      },
      {
        t: "Contanti e due app",
        q: "Prima di salire sull'aereo",
        p: "In Thailandia si paga spesso in contanti e ogni prelievo al bancomat costa circa 220 baht (6 €) di commissione, qualunque sia la cifra. Meglio pochi prelievi grossi. Scaricate <b>Grab</b> e <b>Bolt</b> per muovervi in città.",
      },
    ];
    prima.innerHTML = P.map((x, i) => `
      <div class="prima-item reveal">
        <span class="num">${thai(i + 1)}</span>
        <span class="quando">${x.q}</span>
        <h3>${x.t}</h3>
        <p>${x.p}</p>
      </div>`).join("");
  }

  UI.osserva();
})();

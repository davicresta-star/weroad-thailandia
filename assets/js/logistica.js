/* Logistica: voli, spostamenti, notti */
(function () {
  "use strict";
  const { esc, icon, thai } = UI;
  const MEZZI = { van: "Van", auto: "Auto o taxi", volo: "Volo", traghetto: "Traghetto", speedboat: "Speedboat", barca: "Barca", treno: "Treno notturno" };

  /* ---------- VOLI: una riga per volo, andata e ritorno affiancati ---------- */
  const voliBox = document.getElementById("voli-box");
  if (voliBox) {
    const V = TRIP.voliPax;
    const MESI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    const gg = (iso) => { const d = UI.giorno(iso); return { n: d.getDate(), s: `${UI.dataBreve(iso).split(" ")[0]} · ${MESI[d.getMonth()]}` }; };
    const scali = (v) => (v.scali && v.scali.length ? v.scali.join(" · ") : v.nScali ? `${v.nScali} scalo` : "diretto");

    const riga = (v) => {
      const d = gg(v.data);
      const altroGiorno = v.dataArrivo && v.dataArrivo !== v.data;
      return `
        <li class="volo">
          <div class="v-data"><b>${d.n}</b><span>${d.s}</span></div>
          <div class="v-tratta">
            <div class="v-orari">
              <b>${esc(v.da.code)}</b><span>${esc(v.partenza)}</span>
              <i aria-hidden="true">${icon("volo")}</i>
              <span>${esc(v.arrivo)}${altroGiorno ? "<sup>+1</sup>" : ""}</span><b>${esc(v.a.code)}</b>
            </div>
            <small>${esc(v.da.citta)} → ${esc(v.a.citta)} · ${esc(scali(v))}${altroGiorno ? ` · arrivo ${UI.dataBreve(v.dataArrivo)}` : ""}</small>
          </div>
          <div class="v-pax">${v.pax.map((p) => `<span>${esc(p.split(" ")[0])}</span>`).join("")}</div>
        </li>`;
    };

    const interno = (() => {
      const g = UI.day(6);
      const d = gg(g.data);
      return `
        <div class="volo-int">
          <h3 class="voli-h">Volo interno · Day 6 <span class="badge incluso">Incluso</span></h3>
          <div class="volo">
            <div class="v-data"><b>${d.n}</b><span>${d.s}</span></div>
            <div class="v-tratta">
              <div class="v-orari"><b>CNX</b><span>Chiang Mai</span><i aria-hidden="true">${icon("volo")}</i><span>Surat Thani</span><b>URT</b></div>
              <small>Tutto il gruppo · in aeroporto 2 ore prima · l'orario si riconferma la sera prima</small>
            </div>
          </div>
          <p class="voli-nota">Dalla giungla all'aeroporto di Chiang Mai c'è un'ora e mezza di van. All'arrivo, il transfer di 40 minuti fino all'hotel di Surat Thani si paga a parte.</p>
        </div>`;
    })();

    if (!V.length) {
      voliBox.innerHTML = `<p class="voli-nota">I voli dall'Italia non sono ancora arrivati: appena ci sono, compaiono qui con chi viaggia con chi.</p>${interno}`;
    } else {
      const ordina = (a, b) => (a.data + a.partenza).localeCompare(b.data + b.partenza);
      const andata = V.filter((v) => v.tratta === "andata").sort(ordina);
      const ritorno = V.filter((v) => v.tratta !== "andata").sort(ordina);
      const prima = andata.filter((v) => v.dataArrivo < TRIP.partenza).flatMap((v) => v.pax.map((p) => `${p.split(" ")[0]} (${UI.dataBreve(v.dataArrivo)})`));
      const dopo = ritorno.filter((v) => v.data > TRIP.rientro).flatMap((v) => v.pax.map((p) => `${p.split(" ")[0]} (${UI.dataBreve(v.data)})`));
      voliBox.innerHTML = `
        <div class="voli-due">
          <div><h3 class="voli-h">Andata <span class="thai">ไป</span></h3><ol class="voli">${andata.map(riga).join("")}</ol></div>
          <div><h3 class="voli-h">Ritorno <span class="thai">กลับ</span></h3><ol class="voli">${ritorno.map(riga).join("")}</ol></div>
        </div>
        <p class="voli-nota"><b>Notti fuori programma</b>, da prenotare in autonomia: arrivano prima ${prima.join(", ") || "nessuno"}; ripartono dopo ${dopo.join(", ") || "nessuno"}. Chi atterra il Day 1 alle 06:35 trova il check-in dalle 14:00.</p>
        ${interno}`;
    }
  }

  /* ---------- OGNI SPOSTAMENTO ---------- */
  const tb = document.querySelector("#tab-spost tbody");
  if (tb) {
    tb.innerHTML = TRIP.giorni.flatMap((g) => g.trasferimenti.map((t, i) => `
      <tr data-atto="${g.atto}">
        <td>${i === 0 ? thai(g.n) : ""}<span class="sr-only">Day ${g.n}</span></td>
        <td>${esc(t.da)} → <b>${esc(t.a)}</b>${t.nota ? `<br><small style="color:var(--carta-3)">${t.nota}</small>` : ""}</td>
        <td><span class="m">${icon(t.mezzo)}${esc(MEZZI[t.mezzo])}</span></td>
        <td style="color:var(--carta-2)">${esc(t.durata)}</td>
        <td>${t.tipo === "incluso" ? '<span class="badge incluso">Incluso</span>' : '<span class="badge extra">A parte</span>'}</td>
      </tr>`)).join("");
  }

  /* ---------- DOVE SI DORME ---------- */
  const nb = document.getElementById("notti-box");
  if (nb) {
    const speciali = { homestay: "homestay", treno: "a bordo" };
    nb.innerHTML = TRIP.giorni.filter((g) => g.letto).map((g, i) => {
      const sp = speciali[g.letto];
      return `
        <li class="notte reveal ${sp ? "speciale" : ""}" data-atto="${g.atto}" ${sp ? `data-sp="${sp}"` : ""}>
          <span class="n-n">Notte ${i + 1} · ${UI.dataBreve(g.data)}</span>
          ${icon(g.letto)}
          <b>${esc(g.luogo)}</b>
          ${g.hotel ? `<span>${esc(g.hotel.nome)}</span>` : ""}
          <span>Day ${g.n}</span>
        </li>`;
    }).join("");
  }

  UI.osserva();
})();

/* Zaino: checklist salvata in localStorage */
(function () {
  "use strict";
  const { esc } = UI;
  const KEY = "thai-zaino-v1";

  const CAT = [
    {
      id: "doc", nome: "Documenti e soldi", kc: "var(--oro)",
      intro: "La parte che non si ricompra.",
      voci: [
        { id: "passaporto", t: "Passaporto", n: "Almeno sei mesi di validità: fino a maggio 2027", m: 1 },
        { id: "tdac", t: "Conferma della Digital Arrival Card", n: "L'email sul telefono. Si compila nelle 72 ore prima dell'arrivo", m: 1 },
        { id: "carte", t: "Due carte di pagamento", n: "Una di scorta, tenuta in un posto diverso" },
        { id: "contanti", t: "Contanti", n: "Euro da cambiare in città o baht già prelevati" },
        { id: "copia", t: "Copia del passaporto", n: "Una foto sul telefono e una nel cloud" },
      ],
    },
    {
      id: "templi", nome: "Templi e rooftop", kc: "var(--vermiglio)",
      intro: "Spalle e ginocchia coperte, scarpe che si sfilano in un attimo.",
      voci: [
        { id: "pantaloni", t: "Pantaloni lunghi leggeri", n: "Templi, Grand Palace, rooftop", m: 1 },
        { id: "sciarpa", t: "Sciarpa o pareo", n: "Per coprire le spalle quando serve" },
        { id: "maniche", t: "Magliette con le maniche", n: "Le canottiere nei templi non passano. Chiare e lunghe la sera, contro le zanzare" },
        { id: "chiuse", t: "Scarpe chiuse", n: "Obbligatorie per gli uomini sui rooftop, utili per i sentieri" },
        { id: "sfilabili", t: "Scarpe facili da togliere", n: "Nei templi si entra scalzi, anche cinque volte al giorno" },
      ],
    },
    {
      id: "giungla", nome: "Giungla e homestay", kc: "#8cc56a",
      intro: "Day 5 fra rafting, elefanti e cascate, con la notte in casa di Mr. Tong.",
      voci: [
        { id: "scoglio", t: "Scarpette da scoglio", n: "Bagno con gli elefanti, cascate a Chiang Mai e a Koh Phangan", m: 1 },
        { id: "trek", t: "Scarpe o sandali da trekking", n: "Il trekking è corto ma ripido, su sterrato e bosco" },
        { id: "pantaloni-trek", t: "Pantaloni lunghi per il trekking", n: "Consigliatissimi nel bosco, con il costume sotto per le cascate" },
        { id: "sapone", t: "Bagnoschiuma e shampoo da viaggio", n: "Da Mr. Tong ci sono asciugamani e coperte, ma niente sapone", m: 1 },
        { id: "sacco", t: "Sacco lenzuolo", n: "Non obbligatorio, ma per la notte in casa di Mr. Tong conviene: la sistemazione è molto spartana", c: 1 },
        { id: "zainetto", t: "Zaino piccolo", n: "Per la notte a Koh Tao (Day 9) e per le gite di una giornata" },
        { id: "cambio", t: "Un cambio completo", n: "Dal fiume si esce bagnati fino al collo" },
        { id: "felpa", t: "Felpa", n: "La sera in collina fa fresco, e in treno l'aria condizionata è forte" },
        { id: "torcia", t: "Torcia, meglio frontale", n: "Non fondamentale, ma in homestay la luce è poca e fa comodo", c: 1 },
      ],
    },
    {
      id: "mare", nome: "Mare e pioggia", kc: "var(--laguna)",
      intro: "A novembre sulle isole del Golfo è stagione di piogge.",
      voci: [
        { id: "kway", t: "K-way o poncho", n: "Gli acquazzoni sono forti e arrivano all'improvviso", m: 1 },
        { id: "costume", t: "Due costumi", n: "Uno asciuga mentre si usa l'altro" },
        { id: "sacca", t: "Sacca impermeabile", n: "Telefono e documenti asciutti in barca e sulla zattera del Day 5" },
        { id: "asciugamano", t: "Asciugamano in microfibra", n: "Asciuga in fretta, pesa poco" },
        { id: "ciabatte", t: "Ciabatte" },
        { id: "solare", t: "Crema solare", n: "Anche col cielo coperto" },
      ],
    },
    {
      id: "farmacia", nome: "Farmacia", kc: "var(--neon)",
      intro: "Il minimo, il resto si trova in qualsiasi farmacia thai.",
      voci: [
        { id: "repellente", t: "Repellente per zanzare", n: "Uno tropicale, tipo Autan Tropical: sulle isole a novembre servirà", m: 1 },
        { id: "cerotti", t: "Cerotti e disinfettante", n: "Per vesciche e graffi da sentiero" },
        { id: "pancia", t: "Probiotici e antidiarroico", n: "I probiotici da iniziare qualche giorno prima di partire" },
        { id: "medicine", t: "Le proprie medicine", n: "Sempre nel bagaglio a mano" },
      ],
    },
    {
      id: "tech", nome: "Telefono e app", kc: "var(--carta)",
      intro: "Da sistemare a casa, col wi-fi buono.",
      voci: [
        { id: "grab", t: "Grab e Bolt installate", n: "Taxi e passaggi in città a prezzo chiaro", m: 1 },
        { id: "esim", t: "eSIM o SIM thai", n: "L'eSIM si attiva prima di partire. La SIM si compra in aeroporto o al 7-Eleven" },
        { id: "adattatore", t: "Adattatore universale", n: "La spina italiana a tre poli e la Schuko spesso non entrano" },
        { id: "powerbank", t: "Powerbank", n: "Solo nel bagaglio a mano" },
        { id: "traduttore", t: "Google Traduttore con il thai offline", n: "I menu dello street food ringraziano" },
        { id: "offline", t: "Mappe offline", n: "In giungla e sulle isole il segnale va e viene" },
      ],
    },
  ];

  let stato = {};
  try { stato = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { stato = {}; }
  const salva = () => { try { localStorage.setItem(KEY, JSON.stringify(stato)); } catch (e) { /* navigazione privata */ } };

  const grid = document.getElementById("cat-grid");
  grid.innerHTML = CAT.map((c) => `
    <section class="cat reveal" style="--kc:${c.kc}" data-cat="${c.id}">
      <div class="cat-h"><h3>${esc(c.nome)}</h3><span class="cnt"></span></div>
      <p>${esc(c.intro)}</p>
      ${c.voci.map((v) => `
        <label class="voce">
          <input type="checkbox" data-id="${v.id}" ${stato[v.id] ? "checked" : ""}>
          <span class="v-txt"><b>${esc(v.t)}${v.m ? '<span class="must">essenziale</span>' : v.c ? '<span class="must consigliato">consigliato</span>' : ""}</b>${v.n ? `<small>${esc(v.n)}</small>` : ""}</span>
        </label>`).join("")}
    </section>`).join("");

  const fg = document.querySelector("#anello .fg");
  const C = 2 * Math.PI * 46;
  fg.style.strokeDasharray = C;

  const aggiorna = () => {
    const tutte = grid.querySelectorAll("input");
    const fatte = grid.querySelectorAll("input:checked").length;
    const pct = tutte.length ? Math.round((fatte / tutte.length) * 100) : 0;
    fg.style.strokeDashoffset = C * (1 - pct / 100);
    document.getElementById("z-pct").textContent = pct + "%";
    document.getElementById("z-cnt").textContent = `${fatte} / ${tutte.length}`;
    grid.querySelectorAll(".cat").forEach((s) => {
      const i = s.querySelectorAll("input");
      s.querySelector(".cnt").textContent = `${s.querySelectorAll("input:checked").length}/${i.length}`;
    });
  };

  grid.addEventListener("change", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    if (e.target.checked) stato[id] = 1; else delete stato[id];
    salva();
    aggiorna();
  });
  document.getElementById("z-reset").addEventListener("click", () => {
    stato = {};
    salva();
    grid.querySelectorAll("input").forEach((i) => { i.checked = false; });
    aggiorna();
  });

  aggiorna();
  UI.osserva();
})();

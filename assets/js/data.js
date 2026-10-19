/* ============================================================
   THAILANDIA EXPEDITION: WR-THA-THS-EX-SM
   Turno 31 ottobre → 12 novembre 2026

   Dati del viaggio. È L'UNICO file da toccare quando arrivano
   voli, partecipanti, camere, orari o quote: le pagine leggono
   tutto da qui.
   ============================================================ */

const TRIP = {
  code: "WR-THA-THS-EX-SM",
  titolo: "Thailandia Expedition",
  sottotitolo: "Bangkok, il nord e Koh Phangan",

  /* Day 1 = sabato 31 ottobre a Bangkok, Day 13 = giovedì 12 novembre.
     `primoVolo`: quando si conoscono i voli dall'Italia, mettere qui la
     partenza più presto del gruppo (il countdown punterà a quella). */
  partenza: "2026-10-31",
  rientro: "2026-11-12",
  primoVolo: null,

  coordinatore: {
    nome: "Davide Janiri",
    ruolo: "Coordinatore",
    weroads: null, // numero di WeRoad coordinati: se valorizzato compare in home
    motto: "Scarpe fuori dal tempio, pazienza dentro lo zaino.",
  },

  /* ---------- PARTECIPANTI ----------
     { nome: "Nome Cognome", weroads: 3, eta: 31, genere: "F" }
     Finché l'array è vuoto la home mostra la sezione in attesa. */
  crew: [
    { nome: "Nicola Scavazza",  weroads: 1, genere: "M", first: true },
    { nome: "Claudio Veronesi", weroads: 1, genere: "M", first: true },
    { nome: "Sofia Placidi",    weroads: 1, genere: "F", first: true },
    { nome: "Aurora Ramazzotti", weroads: 1, genere: "F", first: true },
    { nome: "Giulia Ferzi",     weroads: 1, genere: "F", first: true },
  ],

  /* ---------- VOLI PERSONALI DALL'ITALIA ----------
     { pax: ["Nome", "Nome"], tratta: "andata",
       da: { code: "FCO", citta: "Roma" }, a: { code: "BKK", citta: "Bangkok" },
       scali: ["DOH"], data: "2026-10-30", partenza: "21:40", arrivo: "18:05",
       giornoDopo: true, volo: "QR 116" } */
  voliPax: [
    { tratta: "andata", pax: ["Claudio Veronesi"], da: { code: "FCO", citta: "Roma" }, a: { code: "BKK", citta: "Bangkok" },
      nScali: 1, data: "2026-10-28", partenza: "22:00", dataArrivo: "2026-10-29", arrivo: "17:45", giornoDopo: true },
    { tratta: "andata", pax: ["Nicola Scavazza"], da: { code: "BGY", citta: "Bergamo" }, a: { code: "BKK", citta: "Bangkok" },
      nScali: 1, data: "2026-10-29", partenza: "21:40", dataArrivo: "2026-10-30", arrivo: "17:05", giornoDopo: true },
    { tratta: "andata", pax: ["Sofia Placidi", "Aurora Ramazzotti", "Giulia Ferzi"], da: { code: "FCO", citta: "Roma" }, a: { code: "BKK", citta: "Bangkok" },
      nScali: 1, data: "2026-10-30", partenza: "10:25", dataArrivo: "2026-10-31", arrivo: "06:35", giornoDopo: true },
    { tratta: "ritorno", pax: ["Nicola Scavazza"], da: { code: "BKK", citta: "Bangkok" }, a: { code: "BGY", citta: "Bergamo" },
      nScali: 1, data: "2026-11-12", partenza: "11:25", dataArrivo: "2026-11-12", arrivo: "20:35", giornoDopo: false },
    { tratta: "ritorno", pax: ["Sofia Placidi", "Aurora Ramazzotti", "Giulia Ferzi"], da: { code: "BKK", citta: "Bangkok" }, a: { code: "FCO", citta: "Roma" },
      nScali: 1, data: "2026-11-13", partenza: "08:30", dataArrivo: "2026-11-13", arrivo: "17:30", giornoDopo: false },
    { tratta: "ritorno", pax: ["Claudio Veronesi"], da: { code: "BKK", citta: "Bangkok" }, a: { code: "FCO", citta: "Roma" },
      nScali: 1, data: "2026-11-13", partenza: "08:30", dataArrivo: "2026-11-14", arrivo: "17:40", giornoDopo: true },
  ],

  /* ---------- CAMERE ----------
     { tappa: "Bangkok", struttura: "Nome hotel", indirizzo: "",
       camere: [{ tipo: "doppia", ospiti: ["Nome", "Nome"] }] } */
  rooming: [],

  /* ---------- CASSA COMUNE ---------- */
  cassa: {
    quota: 220,
    valuta: "€",
    /* il pacchetto "Spiagge e templi": 175 € a testa, il resto della quota è margine */
    copre: [
      { day: 1,  voce: "SkyWalk al tramonto", prezzo: 35, nota: "Terrazza del grattacielo Mahanakhon con pavimento di vetro, dalle 16 alle 19. Compresi foto digitale e un buono da 200 THB." },
      { day: 2,  voce: "Ayutthaya in tuk tuk", prezzo: 30, nota: "Dalle 10:30 alle 17:00 con guida in inglese: Wat Mahathat, Wat Phra Si Sanphet, Wat Yai Chaimongkol, Wat Chaiwatthanaram e 45 minuti in barca tradizionale. Pranzo escluso." },
      { day: 3,  voce: "Giro in bici a Sukhothai", prezzo: 15, nota: "Mezza giornata nel parco storico con guida in inglese, 15-20 km, snack e bibite compresi. Ingressi al parco esclusi (200 + 130 THB)." },
      { day: 4,  voce: "Cena Khantoke special", prezzo: 23, nota: "Cena tradizionale del Nord con danze e musica dal vivo: arrivo alle 18:30, cena alle 18:45, spettacolo dalle 19:15 alle 20:30. Minivan di andata e ritorno incluso." },
      { day: 4,  voce: "Muay Thai a bordo ring", prezzo: 23, nota: "Stadio Tha Phae: sei o sette incontri dalle 21:15, dal lunedì al sabato." },
      { day: 8,  voce: "Giro delle spiagge di Koh Phangan", prezzo: 21, nota: "Minivan privato con autista per otto ore." },
      { day: 12, voce: "Tour di Bangkok, dalle 8:30 alle 17:30", prezzo: 73, nota: "Giro dei canali (khlong), Wat Pho, Wat Arun e Grand Palace. Guida privata in inglese. Ingressi compresi (circa 27 €, da pagare sul posto)." },
    ],
    metodo: null, // es. "Revolut a Davide entro il 20 ottobre": se valorizzato compare in cassa.html
  },

  /* 1 € in baht, indicativo: serve solo per le conversioni sul sito */
  cambio: 37.5,

  /* ---------- LA NOTTE DI HALLOWEEN (Day 1, sabato 31 ottobre) ----------
     Orari indicativi: fisso è solo lo SkyWalk, il resto è una proposta. */
  halloween: {
    serata: [
      { ora: "16:00", cosa: "SkyWalk al tramonto", nota: "Il primo appuntamento del gruppo, fino alle 19." },
      { ora: "19:30", cosa: "Cena vicino all'hotel", nota: "Per esempio Madame Musur, in Soi Rambuttri, vicino a Khao San Road." },
      { ora: "21:00", cosa: "Trucco e costume", nota: "Sulla strada ci sono bancarelle che dipingono la faccia e vendono maschere per pochi baht." },
      { ora: "22:00", cosa: "Khao San Road", nota: "La festa in strada più famosa di Bangkok." },
    ],
    fantasmi: [
      { nome: "Krasue", thai: "กระสือ", d: "Una testa di donna che vola di notte, con gli organi che penzolano sotto. Il costume più thai che ci sia." },
      { nome: "Mae Nak", thai: "แม่นาก", d: "Il fantasma più famoso di Bangkok: la sposa che aspettò il marito dalla guerra. Allunga il braccio per raccogliere un lime caduto." },
      { nome: "Phi Pop", thai: "ผีปอบ", d: "Lo spirito affamato dei villaggi del nordest. Ottimo per chi ha già fame alle undici di sera." },
    ],
  },

  /* ---------- I TRE ATTI ---------- */
  atti: [
    { n: 1, nome: "Oro",    thai: "ทอง",    titolo: "Il Regno antico", giorni: [1, 6],   luoghi: "Bangkok · Ayutthaya · Sukhothai · Chiang Mai" },
    { n: 2, nome: "Laguna", thai: "ทะเล",   titolo: "Il Golfo",        giorni: [7, 10],  luoghi: "Koh Phangan · Koh Tao" },
    { n: 3, nome: "Notte",  thai: "คืน", titolo: "Ritorno a Bangkok", giorni: [11, 13], luoghi: "Treno notturno · Bangkok" },
  ],

  /* ---------- LA LINEA: le fermate per il diagramma in home ---------- */
  linea: [
    { id: "bkk", nome: "Bangkok",     thai: "กรุงเทพฯ",      day: "1",    atto: 1 },
    { id: "ayu", nome: "Ayutthaya",   thai: "อยุธยา",        day: "2",    atto: 1, mezzo: "van", durata: "1h30" },
    { id: "skt", nome: "Sukhothai",   thai: "สุโขทัย",        day: "3",    atto: 1, mezzo: "van", durata: "5-6h" },
    { id: "cnx", nome: "Chiang Mai",  thai: "เชียงใหม่",      day: "4-5",  atto: 1, mezzo: "van", durata: "4-5h" },
    { id: "urt", nome: "Surat Thani", thai: "สุราษฎร์ธานี",   day: "6",    atto: 1, mezzo: "volo", durata: "volo interno" },
    { id: "kpn", nome: "Koh Phangan", thai: "เกาะพะงัน",      day: "7-8",  atto: 2, mezzo: "traghetto", durata: "van + traghetto" },
    { id: "kt",  nome: "Koh Tao",     thai: "เกาะเต่า",       day: "9",    atto: 2, mezzo: "speedboat", durata: "barca" },
    { id: "kp2", nome: "Koh Phangan", thai: "เกาะพะงัน",      day: "10",   atto: 2, mezzo: "speedboat", durata: "barca" },
    { id: "bk2", nome: "Bangkok",     thai: "กรุงเทพฯ",      day: "11-13", atto: 3, mezzo: "treno", durata: "notte in treno" },
  ],

  /* ---------- I 13 GIORNI ----------
     tipo attività: "incluso" (nel pacchetto), "cassa" (cassa comune),
     "extra" (facoltativa, si paga a parte).
     tipo trasferimento: stesso schema. letto: hotel | homestay | treno */
  giorni: [
    {
      n: 1, data: "2026-10-31", atto: 1,
      titolo: "Benvenuti a Bangkok", luogo: "Bangkok", letto: "hotel",
      foto: null,
      lead: "Si arriva alla spicciolata, ognuno col suo volo. Il primo giorno serve a ritrovarsi, respirare l'umido di Bangkok e, verso sera, salire insieme sul grattacielo più alto della città per il primo tramonto.",
      pasti: [],
      trasferimenti: [],
      attivita: [
        { tipo: "cassa", nome: "SkyWalk al tramonto", nota: "La terrazza del grattacielo Mahanakhon, con il pavimento di vetro, dalle 16 alle 19: si arriva con la luce e si scende a città accesa. Compresi foto digitale e un buono da 200 THB." },
      ],
      consigli: [
        "Il check-in in hotel è dalle <b>14:00</b>: chi atterra presto lascia i bagagli e va a fare un giro.",
        "Per cena c'è <b>Madame Musur</b>, in Soi Rambuttri, a due passi da Khao San Road.",
        "Molti ristoranti chiudono fra le 22 e le 23: meglio non fare troppo tardi.",
        "Il 31 ottobre è sabato, e il <b>mercato di Chatuchak</b> apre solo nel fine settimana: chi arriva la mattina ha l'unica occasione del viaggio.",
      ],
    },
    {
      n: 2, data: "2026-11-01", atto: 1,
      titolo: "Ayutthaya, l'antica capitale", luogo: "Ayutthaya", letto: "hotel",
      foto: "ayutthaya-tramonto.jpg",
      lead: "Un'ora e mezza di van e Bangkok è già lontana. Ayutthaya è stata capitale del Siam per quattro secoli: templi di mattoni rossi, Buddha decapitati, il fiume che gira tutto intorno. Dalle 10:30 fino a sera la si gira in tuk tuk, la sera si cucina con una famiglia del posto.",
      pasti: ["colazione", "cena"],
      trasferimenti: [
        { da: "Bangkok", a: "Ayutthaya", mezzo: "van", durata: "1h30", tipo: "incluso" },
      ],
      attivita: [
        { tipo: "cassa", nome: "Ayutthaya in tuk tuk, dalle 10:30 alle 17:00", nota: "<b>30 €</b> a testa dalla cassa comune. Con guida in inglese, pick-up in hotel alle <b>10:30</b>. I templi più famosi: <b>Wat Mahathat</b>, <b>Wat Phra Si Sanphet</b>, <b>Wat Yai Chaimongkol</b> e <b>Wat Chaiwatthanaram</b>. In mezzo, circa 45 minuti in barca tradizionale fra siti archeologici, templi e campagna. Si finisce verso le 17." },
        { tipo: "incluso", nome: "Cooking class e cena di benvenuto", nota: "Una breve lezione di cucina con una famiglia locale, poi la cena di benvenuto: menu fisso, acqua a volontà e due bibite o due birre a testa. Dopo cena c'è il karaoke sul PC e un tavolo da biliardo." },
      ],
      consigli: [
        "Il pranzo <b>non è incluso</b> nel tour: qualche baht in tasca per mangiare lungo il giro.",
        "Templi tutto il giorno: spalle e ginocchia coperte, e scarpe facili da togliere.",
      ],
    },
    {
      n: 3, data: "2026-11-02", atto: 1,
      titolo: "Verso Sukhothai", luogo: "Sukhothai", letto: "hotel",
      foto: "sukhothai.jpg",
      lead: "La giornata più lunga di strada: cinque o sei ore verso nord. All'arrivo c'è Sukhothai, la prima capitale del regno, dove i Buddha stanno seduti in mezzo agli stagni di loto. È il posto giusto per pedalare: nel pomeriggio si gira tutto il parco in bici, fra risaie e templi, fino al tramonto.",
      pasti: ["colazione"],
      trasferimenti: [
        { da: "Ayutthaya", a: "Sukhothai", mezzo: "van", durata: "5-6h", tipo: "incluso" },
      ],
      attivita: [
        { tipo: "cassa", nome: "Sukhothai in bici, dalle 14:00 alle 19:00 circa", nota: "<b>15 €</b> a testa dalla cassa comune. Ritrovo verso le 14-14:30, 15-20 km in mountain bike. Si parte dal lato est del parco con <b>Wat Chang Lom</b>, si pedala fra un villaggio e le risaie fino alla porta nord e a <b>Wat Si Chum</b>, con uno dei Buddha più belli del paese. Poi strade di campagna a ovest e dentro le mura: <b>Wat Mahathat</b>, <b>Wat Si Sawai</b>, <b>Wat Sa Si</b> e le altre rovine. Pausa snack a metà, rientro in hotel fra le 18:30 e le 19." },
        { tipo: "extra", nome: "Massaggio thai in camera, alle 19:30", nota: "Un'ora, <b>390 THB</b>. Si prenota direttamente alla reception dell'hotel e il massaggio si fa in camera." },
      ],
      consigli: [
        "Nel giro in bici sono compresi guida in inglese, mountain bike a 24 marce con casco (o tandem), assicurazione infortuni, snack, bibite e acqua, una seconda guida e un'auto d'appoggio che segue il gruppo.",
        "<b>Esclusi gli ingressi al parco</b>, da pagare sul posto: zona centrale (Wat Mahathat, Wat Si Sawai, Wat Sa Si, monumento al re) 200 THB, zona nord (Wat Si Chum e Wat Phra Phai Luang) 130 THB.",
        "Lungo la strada da Ayutthaya si può fare una sosta di massimo venti minuti al <b>tempio delle scimmie</b>.",
        "Da Ayutthaya forse partiamo con un piccolo pranzo al sacco. Probabilmente non basterà: si mangia qualcos'altro per strada.",
        "Cena al ristorante dell'hotel con menu fisso da <b>390 THB</b>: tanto cibo, buono, e un patio all'aperto.",
      ],
    },
    {
      n: 4, data: "2026-11-03", atto: 1,
      titolo: "Chiang Mai, la rosa del nord", luogo: "Chiang Mai", letto: "hotel",
      foto: "pha-lat.jpg",
      lead: "Altre quattro o cinque ore di strada e si arriva a Chiang Mai, la città dei trecento templi dentro un fossato quadrato. Nel pomeriggio c'è la guida locale, la sera è piena: cena tradizionale del Nord e poi i pugni del Muay Thai a bordo ring.",
      pasti: ["colazione"],
      trasferimenti: [
        { da: "Sukhothai", a: "Chiang Mai", mezzo: "van", durata: "4-5h", tipo: "incluso" },
      ],
      attivita: [
        { tipo: "extra", nome: "All'alba: l'offerta del cibo ai monaci", nota: "Omaggio di chi ci accompagna in bici il giorno prima: si paga solo il transfer. Prima della partenza per Chiang Mai, a Sukhothai. Spalle e ginocchia coperte, ci si toglie le scarpe, e le donne non toccano i monaci." },
        { tipo: "incluso", nome: "Chiang Mai con guida locale", nota: "Tour della città con una guida che parla inglese." },
        { tipo: "extra", nome: "Wat Pha Lat", nota: "Il monastero nascosto nella foresta, sul sentiero dei monaci che sale verso Doi Suthep." },
        { tipo: "cassa", nome: "Cena Khantoke special", nota: "Cena tradizionale del Nord con danze e musica dal vivo: arrivo alle 18:30, cena alle 18:45, spettacolo dalle 19:15 alle 20:30. Minivan di andata e ritorno incluso." },
        { tipo: "cassa", nome: "Muay Thai a bordo ring", nota: "Allo stadio Tha Phae vanno in scena sei o sette incontri, dalle 21:15 (il 3 novembre è martedì, e si combatte dal lunedì al sabato)." },
      ],
      consigli: [
        "La serata scorre in due tempi: Khantoke dalle 18:30 (spettacolo fino alle 20:30), poi il ring alle 21:15. In mezzo c'è il tempo per rientrare e arrivare allo stadio senza correre.",
        "Un <b>massaggio thai</b> o all'olio, per tutti, dopo due giorni di van.",
        "Per bere: <b>Zoe in Yellow</b> e il live bar <b>morooms.art.can.live</b> chiudono presto. <b>Differ Inc</b> è un club e va avanti fino alle 2.",
      ],
      attenzione: "Nei templi di Chiang Mai niente canottiere e niente pantaloncini.",
    },
    {
      n: 5, data: "2026-11-04", atto: 1,
      titolo: "Elefanti, bambù e giungla", luogo: "Homestay nella giungla", letto: "homestay",
      hotel: { nome: "Casa di Mr. Tong, guesthouse tradizionale", indirizzo: null },
      foto: "elefante-2.jpg",
      lead: "Il giorno che tutti ricorderanno. Alle 8:30 si parte dall'hotel per tutta la giornata: la discesa del fiume su una zattera di bambù, il bagno con gli elefanti, un pranzo in un bel posto e un trekking fra le cascate. La notte si dorme in casa di Mr. Tong, in campagna.",
      pasti: ["colazione", "pranzo", "cena"],
      trasferimenti: [
        { da: "Hotel a Chiang Mai", a: "Fiume", mezzo: "van", durata: "1h30", tipo: "incluso", nota: "Con una sosta al mercato locale per bagno e caffè." },
        { da: "Fiume", a: "Campo degli elefanti", mezzo: "van", durata: "15 min", tipo: "incluso" },
      ],
      attivita: [
        { tipo: "incluso", nome: "Bamboo rafting", nota: "Si scende il fiume su una zattera di bambù, e ci si bagna: si va <b>in costume</b>. Niente scarpe, bastano ciabatte o scarpette da scoglio. Per portare il telefono serve una sacca impermeabile." },
        { tipo: "incluso", nome: "Elefanti: pappa e bagno", nota: "Si dà da mangiare agli elefanti e poi si fa il bagno con loro. Ci sono delle «docce» per sciacquarsi, ma l'acqua è presa dal fiume ed esce piena di sassolini: un cambio completo in borsa salva la giornata." },
        { tipo: "incluso", nome: "Pranzo", nota: "Buonissimo, in un bel posto." },
        { tipo: "incluso", nome: "Trekking fra le cascate", nota: "Difficoltà media: corto ma ripido, su sterrato e nel bosco. L'acqua la danno loro. Consigliatissimi <b>pantaloni lunghi</b> e il costume sotto, per il bagno nelle cascate. Portate qualche baht: lungo il sentiero ci sono bancarelle di souvenir." },
        { tipo: "incluso", nome: "Cena tradizionale con la famiglia ospitante", nota: "Compresi acqua e birra a testa." },
      ],
      consigli: [
        "Mr. Tong <b>non parla inglese</b>: è il giorno giusto per provare le parole thai del <a href=\"faq.html#frasi\">frasario</a>.",
        "In casa ci sono asciugamani e coperte, ma <b>niente sapone</b>: portate bagnoschiuma e shampoo da viaggio.",
      ],
      attenzione: "Sul sentiero terra e rocce sono scivolose: si va piano e si guarda dove si mette il piede. La casa di Mr. Tong è molto rurale ed essenziale, bagno compreso: il sacco lenzuolo non è obbligatorio, ma conviene portarlo.",
    },
    {
      n: 6, data: "2026-11-05", atto: 1,
      titolo: "Si vola a sud", luogo: "Surat Thani", letto: "hotel",
      foto: null,
      lead: "Dalla giungla all'aeroporto di Chiang Mai, poi un volo interno fino a Surat Thani, la porta del Golfo. Il programma della mattina dipende dall'orario del volo: se si parte nel tardo pomeriggio c'è tempo per un'ultima cosa al nord.",
      pasti: ["colazione"],
      trasferimenti: [
        { da: "Homestay", a: "Aeroporto di Chiang Mai", mezzo: "van", durata: "1h30", tipo: "incluso" },
        { da: "Chiang Mai", a: "Surat Thani", mezzo: "volo", durata: "volo interno", tipo: "incluso", nota: "In aeroporto due ore prima. L'orario si riconferma la sera prima." },
        { da: "Aeroporto di Surat Thani", a: "Hotel", mezzo: "auto", durata: "40 min", tipo: "extra" },
      ],
      attivita: [],
      consigli: [
        "A Surat Thani la sera molti locali sono chiusi: il tavolo si prenota prima. Tre posti buoni: <b>Time Machine</b>, <b>Not Teen Anymore</b> e <b>Na-Soyhe</b>, che è ristorante e bar insieme.",
      ],
    },
    {
      n: 7, data: "2026-11-06", atto: 2,
      titolo: "Traghetto per Koh Phangan", luogo: "Koh Phangan", letto: "hotel",
      foto: "bottle-beach.jpg",
      lead: "Sveglia presto: alle 6:30 si parte dall'hotel verso il porto, alle 8:30 c'è il traghetto e verso le 11 si sbarca a Koh Phangan, un'isola di giungla e spiagge. Poi in van fino all'hotel. Il resto della giornata è libero: si esplora l'isola.",
      pasti: [],
      trasferimenti: [
        { da: "Hotel", a: "Porto di Surat Thani", mezzo: "van", durata: "06:30 – 08:00", tipo: "incluso" },
        { da: "Surat Thani", a: "Koh Phangan", mezzo: "traghetto", durata: "08:30 – 11:00", tipo: "incluso" },
        { da: "Porto di Koh Phangan", a: "Hotel", mezzo: "van", durata: "breve", tipo: "incluso" },
      ],
      attivita: [
        { tipo: "extra", chi: "Nicola e Claudio", nome: "Pesca tradizionale, dalle 12:00 alle 18:00", nota: "In barca tradizionale intorno a <b>Koh Tae Nok</b> e <b>Koh Kong Yai</b> (i punti di pesca cambiano secondo le condizioni del mare). Si pesca a lenza con i pescatori del posto e, se qualcosa abbocca, il pesce si griglia fresco a fine giro. A bordo ci sono maschera e boccaglio per lo snorkeling. Transfer dall'hotel e ritorno compresi; si rientra prima del buio." },
      ],
      consigli: [
        "Al molo arrivano più gruppi alla stessa ora e ogni van va in un hotel diverso: si sale solo su quello che indica Davide.",
        "Per cena: <b>No Name</b>, <b>Fisherman</b> oppure <b>Full Moon Haad Rin Seafood</b>.",
        "Per la sera: il <b>Waterfall Party</b> (discoteca) o il <b>Rasta Home</b> (bar). Sull'isola c'è sempre qualcosa: si guarda il calendario degli eventi della settimana.",
      ],
    },
    {
      n: 8, data: "2026-11-07", atto: 2,
      titolo: "Il giro delle spiagge", luogo: "Koh Phangan", letto: "hotel",
      foto: "phangan.jpg",
      lead: "Una giornata intera per vedere Koh Phangan senza pensare a come muoversi: un minivan privato con autista per otto ore, e si decide insieme dove fermarsi fra spiagge, belvedere e cascate.",
      pasti: ["colazione"],
      trasferimenti: [],
      attivita: [
        { tipo: "cassa", nome: "Giro delle spiagge in minivan privato", nota: "Autista a disposizione per otto ore. Per il belvedere servono scarpe chiuse (qualche tratto è un po' tecnico) e scarpette da scoglio per il bagno in cascata." },
      ],
      consigli: [
        "Il tramonto della <b>Secret Beach</b> vale da solo la giornata.",
        "Chi preferisce saltare il giro può andare a <b>Koh Raham</b>: un bar affacciato sul mare accanto a una barriera corallina dove si fa snorkeling.",
      ],
    },
    {
      n: 9, data: "2026-11-08", atto: 2,
      titolo: "Koh Tao e Koh Nang Yuan", luogo: "Koh Tao", letto: "hotel",
      foto: "koh-nang-yuan.jpg",
      lead: "Sveglia presto e barca da Koh Phangan verso Koh Tao, l'isola delle tartarughe. Una giornata di escursione con la visita a Koh Nang Yuan, il pranzo a buffet thailandese a bordo e, nel pomeriggio, tre soste di snorkeling. La sera si sbarca al molo di Mae Haad e si dorme in hotel a Koh Tao.",
      pasti: ["colazione", "pranzo"],
      trasferimenti: [
        { da: "Koh Phangan", a: "Koh Tao", mezzo: "barca", durata: "la mattina presto", tipo: "incluso", nota: "Si naviga in escursione: Koh Nang Yuan e le soste di snorkeling sono lungo il percorso." },
        { da: "Molo di Mae Haad", a: "Hotel a Koh Tao", mezzo: "van", durata: "breve", tipo: "incluso", nota: "Trasferimento e check-in in hotel." },
      ],
      attivita: [
        { tipo: "incluso", nome: "Escursione a Koh Nang Yuan", nota: "Si visita il piccolo gruppo di isolotti legati da una lingua di sabbia, a nord-ovest di Koh Tao." },
        { tipo: "incluso", nome: "Pranzo a buffet thailandese in barca", nota: "" },
        { tipo: "incluso", nome: "Tre soste di snorkeling", nota: "Nel pomeriggio: <b>Hin Wong Bay</b>, <b>Ao Luek</b> e <b>Shark Bay</b>, fino al rientro serale al molo di Mae Haad." },
      ],
      consigli: [
        "Nello zainetto della giornata: costume, asciugamano, crema solare e k-way.",
        "Si dorme a Koh Tao: serve uno zainetto con quello che occorre per la sera e per la mattina dopo.",
        "A novembre il mare può essere mosso: le uscite in barca dipendono dal meteo.",
      ],
    },
    {
      n: 10, data: "2026-11-09", atto: 2,
      titolo: "Una mattina a Koh Tao", luogo: "Koh Phangan", letto: "hotel",
      foto: "koh-tao.jpg",
      lead: "La mattinata è libera a Koh Tao: un ultimo bagno, una colazione lenta, quello che vi va. Alle 15:30 si riparte in barca verso Koh Phangan, con arrivo e rientro in hotel previsti per le 16:45.",
      pasti: ["colazione"],
      trasferimenti: [
        { da: "Koh Tao", a: "Koh Phangan", mezzo: "barca", durata: "15:30 → in hotel alle 16:45", tipo: "incluso" },
      ],
      attivita: [],
      consigli: [
        "La barca delle 15:30 è l'unico orario fisso della giornata: la mattina è tutta vostra.",
        "La sera è libera a Koh Phangan: l'ultima prima del treno notturno.",
      ],
    },
    {
      n: 11, data: "2026-11-10", atto: 3,
      titolo: "Il treno della notte", luogo: "In treno verso Bangkok", letto: "treno",
      foto: null,
      lead: "La giornata dei saluti al mare: traghetto per la terraferma, van fino a Surat Thani e poi una notte in cuccetta attraverso il sud della Thailandia. Si dorme cullati dai binari e ci si sveglia a Bangkok.",
      pasti: ["colazione"],
      trasferimenti: [
        { da: "Hotel", a: "Molo di Thong Sala", mezzo: "van", durata: "breve", tipo: "incluso" },
        { da: "Thong Sala", a: "Porto di Donsak", mezzo: "traghetto", durata: "2h30", tipo: "incluso" },
        { da: "Donsak", a: "Surat Thani", mezzo: "van", durata: "1h30", tipo: "incluso" },
        { da: "Surat Thani", a: "Bangkok", mezzo: "treno", durata: "tutta la notte", tipo: "incluso", nota: "Arrivo previsto verso le 7:00. Se il treno è pieno, c'è un bus notturno al suo posto." },
      ],
      attivita: [],
      consigli: [
        "Nello zaino da tenere con sé: spazzolino, felpa (l'aria condizionata a bordo è forte), tappi, qualcosa da mangiare.",
      ],
    },
    {
      n: 12, data: "2026-11-11", atto: 3,
      titolo: "Bangkok, finalmente", luogo: "Bangkok", letto: "hotel",
      foto: "wat-arun-2.jpg",
      lead: "Dal treno al tour: dalle 8:30 alle 17:30 la città è tutta da prendere, fra i canali, Wat Pho, Wat Arun e il Grand Palace. La sera, per l'ultimo brindisi, si sale al 78° piano per una cena con vista su tutta Bangkok.",
      pasti: [],
      trasferimenti: [],
      attivita: [
        { tipo: "cassa", nome: "Tour di Bangkok, dalle 8:30 alle 17:30", nota: "Giro dei canali (khlong) in barca, visita a Wat Pho e a Wat Arun, poi il Grand Palace. Guida privata in inglese. Ingressi compresi (circa 27 €, da pagare sul posto). Passaporto e pantaloni lunghi obbligatori." },
        { tipo: "extra", nome: "Cena al Bangkok Sky Restaurant, dalle 19:00 alle 21:30", nota: "Al 78° piano: buffet di pesce e internazionale con vista sulla città. Per gli uomini pantaloni lunghi e scarpe chiuse." },
        { tipo: "extra", nome: "Dopocena a scelta", nota: "Khao San Road, il mercato notturno di Chinatown oppure un massaggio thai." },
      ],
      consigli: [
        "Il treno arriva verso le 7 e il tour parte alle 8:30: il tempo per una colazione e per lasciare i bagagli.",
        "Wat Pho e il suo Buddha sdraiato sono dentro il tour: non serve organizzarsi da soli.",
      ],
    },
    {
      n: 13, data: "2026-11-12", atto: 3,
      titolo: "Arrivederci Thailandia", luogo: null, letto: null,
      foto: null,
      lead: "Fine del viaggio. Il check-out all'hotel è entro le 11. Ultima colazione, ultimi baht da spendere, saluti e abbracci, poi ognuno verso il suo volo. Al prossimo WeRoad!",
      pasti: [],
      trasferimenti: [],
      attivita: [],
      consigli: [
        "Check-out entro le <b>11:00</b>: le valigie si possono lasciare in reception se il volo è nel pomeriggio.",
      ],
    },
  ],

  /* ---------- COSA È INCLUSO NEL PACCHETTO ---------- */
  pacchetto: {
    incluso: [
      "12 notti: hotel (compresa una a Koh Tao), una in homestay nella giungla e una in treno",
      "Tutti i trasferimenti del programma: van, traghetti e speedboat",
      "Il volo interno Chiang Mai → Surat Thani",
      "Il treno notturno (o il bus) Surat Thani → Bangkok",
      "Cooking class con una famiglia locale e cena di benvenuto ad Ayutthaya",
      "Tour di Chiang Mai con guida locale",
      "La giornata nella giungla: bamboo rafting, elefanti, pranzo, trekking, cena con la famiglia ospitante",
      "Escursione a Koh Nang Yuan con pranzo a buffet in barca e tre soste di snorkeling (Day 9)",
      "Colazione dal Day 2 al Day 12 (tranne i Day 7 e 12), pranzo il Day 5 e il Day 9, cena il Day 2 e il Day 5",
    ],
    escluso: [
      "Voli dall'Italia",
      "Pasti non indicati",
      "Le attività facoltative",
      "Il transfer dall'aeroporto di Surat Thani all'hotel (Day 6)",
      "Le mance, comprese quelle a guide e autisti",
    ],
  },

  /* ---------- MANCE ---------- */
  mance: [
    { chi: "Ristorante", quanto: "10", unita: "%", per: "del conto, se il servizio non è già incluso" },
    { chi: "Bar, massaggi, piccoli servizi", quanto: "5-20", unita: "THB", per: "nelle situazioni di tutti i giorni" },
    { chi: "Guide e autisti", quanto: "10-15", unita: "€", per: "al giorno per gruppo, fuori dalla cassa: ognuno versa la sua parte" },
  ],

  /* ---------- QUANTO SI SPENDE (stime medie) ---------- */
  prezzi: [
    { v: "SIM", p: "15-25 €", n: "per 15 giorni" },
    { v: "Transfer dall'aeroporto", p: "6-15 €" },
    { v: "Street food", p: "1-3 €", n: "a piatto" },
    { v: "Ristorante", p: "10-25 €" },
    { v: "Acqua", p: "0,30-0,80 €", n: "in bottiglia" },
    { v: "Birra", p: "2-4 €" },
    { v: "Cocktail", p: "4-15 €" },
    { v: "Noleggio scooter", p: "6-12 €", n: "al giorno" },
    { v: "Massaggio", p: "8-16 €" },
  ],
};

/* ---------- LUOGHI PER LA MAPPA ----------
   day: giorno di riferimento · k: categoria (tempio, natura, mare,
   mercato, notte, snodo) · approx: posizione indicativa */
const LUOGHI = [
  { n: "Wat Pho",                   lat: 13.7463, lng: 100.4927, day: 12, k: "tempio",  d: "Il Buddha sdraiato, 46 metri d'oro." },
  { n: "Grand Palace",              lat: 13.7500, lng: 100.4913, day: 12, k: "tempio",  d: "Passaporto e pantaloni lunghi." },
  { n: "Wat Arun",                  lat: 13.7439, lng: 100.4885, day: 12, k: "tempio",  d: "Il tempio dell'alba, sull'altra riva del fiume." },
  { n: "Khao San Road",             lat: 13.7589, lng: 100.4973, day: 1,  k: "notte",   d: "La festa di Halloween in strada, il 31 ottobre." },
  { n: "Soi Rambuttri",             lat: 13.7615, lng: 100.4943, day: 1,  k: "notte",   d: "Madame Musur e la zona di Khao San." },
  { n: "Chatuchak Weekend Market",  lat: 13.8003, lng: 100.5511, day: 1,  k: "mercato", d: "Solo sabato e domenica: per noi il Day 1." },
  { n: "Wat Chaiwatthanaram",       lat: 14.3430, lng: 100.5419, day: 2,  k: "tempio",  d: "Il tramonto più bello di Ayutthaya." },
  { n: "Wat Phra Si Sanphet",       lat: 14.3558, lng: 100.5584, day: 2,  k: "tempio",  d: "I tre chedi del palazzo reale antico." },
  { n: "Wat Yai Chaimongkol",       lat: 14.3455, lng: 100.5926, day: 2,  k: "tempio",  d: "Il grande chedi e la fila di Buddha in arancione." },
  { n: "Wat Mahathat (Ayutthaya)",  lat: 14.3564, lng: 100.5685, day: 2,  k: "tempio",  d: "La testa del Buddha fra le radici." },
  { n: "Wat Si Chum",               lat: 17.0269, lng: 99.6932, day: 3,  k: "tempio",  d: "Il grande Buddha seduto, alla porta nord." },
  { n: "Parco storico di Sukhothai", lat: 17.0218, lng: 99.7031, day: 3,  k: "tempio",  d: "Da girare in bici." },
  { n: "Porta di Tha Phae",         lat: 18.7878, lng: 98.9933, day: 4,  k: "snodo",   d: "Il cuore della città vecchia; lo stadio di Muay Thai è in zona." },
  { n: "Night Bazaar",              lat: 18.7844, lng: 99.0004, day: 4,  k: "mercato", d: "Cena veloce e bancarelle." },
  { n: "Wat Pha Lat",               lat: 18.7992, lng: 98.9340, day: 4,  k: "tempio",  d: "Il monastero nella foresta." },
  { n: "Wat Phra That Doi Suthep",  lat: 18.8049, lng: 98.9216, day: 4,  k: "tempio",  d: "Il chedi d'oro sopra la città." },
  { n: "Aeroporto di Chiang Mai",   lat: 18.7668, lng: 98.9649, day: 6,  k: "snodo",   d: "Volo interno verso sud." },
  { n: "Aeroporto di Surat Thani",  lat: 9.1326,  lng: 99.1356, day: 6,  k: "snodo",   d: "Atterraggio nel sud." },
  { n: "Stazione di Surat Thani",   lat: 9.1042,  lng: 99.2304, day: 11, k: "snodo",   d: "Partenza del treno notturno." },
  { n: "Porto di Donsak",           lat: 9.3382,  lng: 99.6801, day: 7,  k: "snodo",   d: "Traghetto per l'isola." },
  { n: "Molo di Thong Sala",        lat: 9.7090,  lng: 99.9842, day: 7,  k: "snodo",   d: "Si sbarca qui." },
  { n: "Secret Beach",              lat: 9.7687,  lng: 99.9610, day: 8,  k: "mare",    d: "Tramonto sul mare, lato ovest." },
  { n: "Koh Ma",                    lat: 9.8010,  lng: 99.9792, day: 8,  k: "mare",    d: "L'isolotto unito da una lingua di sabbia." },
  { n: "Haad Rin",                  lat: 9.6756,  lng: 100.0656, day: 7, k: "notte",   d: "La spiaggia delle feste." },
  { n: "Koh Nang Yuan",             lat: 10.1151, lng: 99.8141, day: 9,  k: "mare",    d: "Tre isolotti uniti da una lingua di sabbia." },
  { n: "Shark Bay",                 lat: 10.0657, lng: 99.8321, day: 9,  k: "mare",    d: "Una delle tre soste di snorkeling." },
  { n: "Ao Luek",                   lat: 10.0720, lng: 99.8390, day: 9,  k: "mare",    d: "Un'altra sosta di snorkeling." },
  { n: "Molo di Mae Haad (Koh Tao)", lat: 10.0838, lng: 99.8332, day: 9, k: "snodo",   d: "Sbarco serale e hotel a Koh Tao." },
  { n: "MahaNakhon SkyWalk",        lat: 13.7236, lng: 100.5283, day: 1, k: "tempio",  d: "Tramonto dal pavimento di vetro, dalle 16 alle 19." },
];

/* Il tragitto per la mappa: m = mezzo del segmento che ARRIVA al punto */
const ROTTA = [
  { lat: 13.7563, lng: 100.5018 },                 // Bangkok
  { lat: 14.3532, lng: 100.5689, m: "van" },       // Ayutthaya
  { lat: 17.0078, lng: 99.8230,  m: "van" },       // Sukhothai
  { lat: 18.7883, lng: 98.9853,  m: "van" },       // Chiang Mai
  { lat: 18.7668, lng: 98.9649,  m: "van" },       // aeroporto CNX
  { lat: 9.1326,  lng: 99.1356,  m: "volo" },      // aeroporto URT
  { lat: 9.1382,  lng: 99.3215,  m: "van" },       // Surat Thani
  { lat: 9.3382,  lng: 99.6801,  m: "van" },       // Donsak
  { lat: 9.7090,  lng: 99.9842,  m: "mare" },      // Thong Sala
  { lat: 10.0838, lng: 99.8332,  m: "mare" },      // Koh Tao (Mae Haad)
  { lat: 9.7090,  lng: 99.9842,  m: "mare" },      // Koh Phangan
  { lat: 9.3382,  lng: 99.6801,  m: "mare" },      // Donsak
  { lat: 9.1042,  lng: 99.2304,  m: "van" },       // stazione Surat Thani
  { lat: 13.7563, lng: 100.5018, m: "treno" },     // Bangkok
];

/* Crediti delle foto (Wikimedia Commons): le licenze CC chiedono l'attribuzione */
const FOTO_CREDITI = [
  { f: "ayutthaya-chai.jpg",     a: "Stefan Fussan",         l: "CC BY-SA 3.0" },
  { f: "ayutthaya-tramonto.jpg", a: "Justin Vidamo",         l: "CC BY 2.0" },
  { f: "sukhothai.jpg",          a: "Supanut Arun",          l: "CC BY 4.0" },
  { f: "sukhothai-2.jpg",        a: "Vyacheslav Argenberg",  l: "CC BY 4.0" },
  { f: "pha-lat.jpg",            a: "Stefan Fussan",         l: "CC BY-SA 3.0" },
  { f: "pha-lat-2.jpg",          a: "Supanut Arun",          l: "CC BY 4.0" },
  { f: "doi-suthep.jpg",         a: "Philip Nalangan",       l: "CC BY 4.0" },
  { f: "elefante.jpg",           a: "Nina R",                l: "CC BY 2.0" },
  { f: "elefante-2.jpg",         a: "Nina R",                l: "CC BY 2.0" },
  { f: "bottle-beach.jpg",       a: "kaaist",                l: "CC0" },
  { f: "phangan.jpg",            a: "Fabio Achilli",         l: "CC BY 2.0" },
  { f: "koh-nang-yuan.jpg",      a: "Justraveling.com",      l: "CC BY-SA 4.0" },
  { f: "koh-tao.jpg",            a: "Fabio Achilli",         l: "CC BY 2.0" },
  { f: "wat-arun.jpg",           a: "Don Ramey Logan",       l: "CC BY-SA 3.0" },
  { f: "wat-arun-2.jpg",         a: "Diego Delso",           l: "CC BY-SA 3.0" },
];

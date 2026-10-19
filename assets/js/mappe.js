/* Mappa: Leaflet + CARTO scuro, tragitto per mezzo, luoghi per giorno */
(function () {
  "use strict";
  const { esc } = UI;
  if (typeof L === "undefined") {
    document.getElementById("mappa").innerHTML = '<p style="padding:24px;color:var(--carta-3)">La mappa non si è caricata: serve la connessione.</p>';
    return;
  }

  const css = getComputedStyle(document.documentElement);
  const COL = { 1: css.getPropertyValue("--oro").trim(), 2: css.getPropertyValue("--laguna").trim(), 3: css.getPropertyValue("--neon").trim() };
  const attoDi = (day) => (UI.day(day) || { atto: 1 }).atto;

  const map = L.map("mappa", { zoomControl: true, scrollWheelZoom: false, tap: true });
  /* tile OpenStreetMap (niente chiave); il tono scuro e caldo lo dà un filtro CSS su .tile-lacca */
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18, className: "tile-lacca",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  map.on("focus", () => map.scrollWheelZoom.enable());
  map.on("blur", () => map.scrollWheelZoom.disable());

  /* ---------- il tragitto ---------- */
  const arco = (a, b, k = 0.18) => {
    /* il volo come arco: bezier quadratica con il punto di controllo spostato di lato */
    const mx = (a.lat + b.lat) / 2, my = (a.lng + b.lng) / 2;
    const dx = b.lat - a.lat, dy = b.lng - a.lng;
    const c = { lat: mx - dy * k, lng: my + dx * k };
    const pts = [];
    for (let t = 0; t <= 1.0001; t += 0.05) {
      pts.push([(1 - t) ** 2 * a.lat + 2 * (1 - t) * t * c.lat + t * t * b.lat, (1 - t) ** 2 * a.lng + 2 * (1 - t) * t * c.lng + t * t * b.lng]);
    }
    return pts;
  };
  for (let i = 1; i < ROTTA.length; i++) {
    const a = ROTTA[i - 1], b = ROTTA[i];
    if (a.lat === b.lat && a.lng === b.lng) continue;
    if (b.m === "volo") {
      L.polyline(arco(a, b, -0.22), { color: COL[1], weight: 2.5, dashArray: "8 8", opacity: .9 }).addTo(map);
    } else if (b.m === "mare") {
      L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: COL[2], weight: 3, dashArray: "1 7", lineCap: "round", opacity: .95 }).addTo(map);
    } else if (b.m === "treno") {
      L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: COL[3], weight: 7, opacity: .25 }).addTo(map);
      L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: COL[3], weight: 2, dashArray: "3 5", opacity: 1 }).addTo(map);
    } else {
      L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: COL[1], weight: 3, opacity: .85 }).addTo(map);
    }
  }

  /* ---------- i luoghi ---------- */
  const luoghi = [...LUOGHI].sort((a, b) => a.day - b.day);
  const markers = luoghi.map((l) => {
    const atto = attoDi(l.day);
    const icon = L.divIcon({
      className: "",
      html: `<div class="pin" style="--pc:${COL[atto]}">${l.day}</div>`,
      iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -14],
    });
    const m = L.marker([l.lat, l.lng], { icon, title: l.n, riseOnHover: true })
      .bindPopup(`<small>Day ${l.day} · ${UI.dataBreve(UI.day(l.day).data)}</small><b>${esc(l.n)}</b>${esc(l.d)}`);
    m.atto = atto;
    m.addTo(map);
    return m;
  });

  const tutti = L.featureGroup(markers);
  map.fitBounds(tutti.getBounds(), { padding: [30, 30] });

  /* ---------- filtri per atto ---------- */
  const filtri = document.getElementById("filtri");
  const opz = [{ n: 0, l: "Tutto il viaggio" }, ...TRIP.atti.map((a) => ({ n: a.n, l: `${a.nome} · ${a.titolo}` }))];
  filtri.innerHTML = opz.map((o) => `<button class="filtro" type="button" data-n="${o.n}" ${o.n ? `data-atto="${o.n}"` : ""} aria-pressed="${o.n === 0}">${esc(o.l)}</button>`).join("");
  filtri.addEventListener("click", (e) => {
    const b = e.target.closest(".filtro");
    if (!b) return;
    const n = Number(b.dataset.n);
    filtri.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
    const sel = markers.filter((m) => !n || m.atto === n);
    markers.forEach((m) => (sel.includes(m) ? m.addTo(map) : m.remove()));
    map.flyToBounds(L.featureGroup(sel).getBounds(), { padding: [40, 40], duration: UI.reduce ? 0 : 1.1, maxZoom: 12 });
  });

  /* ---------- lista ---------- */
  const lista = document.getElementById("luoghi");
  lista.innerHTML = luoghi.map((l, i) => `
    <li data-atto="${attoDi(l.day)}"><button type="button" data-i="${i}">
      <span class="l-d">${UI.thai(l.day)}</span><b>${esc(l.n)}</b><span>${esc(l.d)}</span>
    </button></li>`).join("");
  lista.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const m = markers[Number(b.dataset.i)];
    if (!map.hasLayer(m)) m.addTo(map);
    document.getElementById("mappa").scrollIntoView({ behavior: UI.reduce ? "auto" : "smooth", block: "center" });
    map.flyTo(m.getLatLng(), 14, { duration: UI.reduce ? 0 : 1.2 });
    map.once("moveend", () => m.openPopup());
  });

  UI.osserva();
})();

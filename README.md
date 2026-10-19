# Thailandia Expedition · WR-THA-THS-EX-SM

Il sito del gruppo per il viaggio WeRoad in **Thailandia**, turno 31 ottobre → 12 novembre 2026:
Bangkok, Ayutthaya, Sukhothai, Chiang Mai, Koh Phangan, Koh Tao.
Sito statico: niente build, niente dipendenze. Si apre e funziona.

## Le pagine

| File | Cosa c'è dentro |
|---|---|
| `index.html` | Countdown, la linea del percorso, i timbri, la crew, cosa fare prima di partire |
| `itinerario.html` | I 13 giorni in tre atti, lo speciale Halloween, il biglietto del treno notturno |
| `logistica.html` | Voli di andata e ritorno, volo interno, tutti gli spostamenti, dove si dorme |
| `cassa.html` | Cassa comune (220 €) e cosa copre, prezzi medi, mance, contanti |
| `zaino.html` | Checklist dello zaino (si salva nel browser) e dress code dei templi |
| `mappe.html` | Mappa interattiva (Leaflet + tile OpenStreetMap) |
| `faq.html` | Regole del paese, salute e assicurazione, truffe, frasario thai, FAQ |

## Come si modifica

**Quasi tutto sta in `assets/js/data.js`**: giorni, orari, attività, crew, voli, cassa, mance,
prezzi, luoghi della mappa. Si cambia lì e le pagine si aggiornano da sole.

- `assets/css/style.css`: lo stile
- `assets/js/main.js`: navigazione, countdown, icone, footer
- `assets/js/*.js`: una per pagina (itinerario, logistica, home, zaino, mappe)
- `assets/img/`: le foto (Wikimedia Commons, crediti nel footer)

> **Cache**: i link a CSS e JS finiscono con `?v=N`. Dopo una modifica a uno di quei file,
> incrementa il numero in tutte le pagine, altrimenti i browser mostrano la versione vecchia.

## Vederlo in locale

```bash
python serve.py
```

Poi apri <http://localhost:8743>.

## Pubblicazione

GitHub Pages: *Settings → Pages → Deploy from a branch → `main` / root*.
Il file `.nojekyll` fa servire i file così come sono.

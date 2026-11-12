# Planer sesji i terminów

Projekt z przedmiotu *Metody opracowywania interfejsów użytkownika* (semestr zimowy 2026/27).
Temat nr 8: **Planer sesji i terminów**.

**Zespół:** _(uzupełnić: numery albumów)_ · grupa lab.: _(uzupełnić)_

**Dokumentacja (PDF):** [`docs/`](docs/) _(link po L9)_

## Technologia

Astro (statyczna strona), TypeScript, czysty CSS. Ekrany Start, Terminy i Szczegóły to wyspy React
(`@astrojs/react`) z efektami wzorowanymi na Magic UI i React Bits (`motion`), ikony z `lucide-react`.
Bez serwera: dane startowe w
`src/data/terminy.json`, a terminy dodawane przez użytkownika trafiają do `localStorage`.

## Uruchomienie lokalne

Wymagania: Node.js 22.23.4 lub nowszy, npm.

```bash
npm install
npm run dev        # podgląd na http://localhost:4321/MOIU-Planer-Sesji-I-Terminow/
```

Wersja produkcyjna:

```bash
npm run build
npm run preview
```

Uwaga: w `astro.config.mjs` ustawiono `base` pod GitHub Pages, więc adres lokalny zawiera
nazwę repozytorium. Linki w kodzie budujemy przez `url()` z `src/lib/url.ts`.

## Struktura

```
src/data/terminy.json      dane startowe
src/lib/store.ts           odczyt i zapis (JSON + localStorage)
src/lib/validate.ts        reguły walidacji formularza
src/lib/url.ts             linki z uwzględnieniem base
src/layouts/Layout.astro   ramy graficzne, nawigacja, skip-link
src/components/            Nav, Breadcrumbs (Astro); TerminCard, TypBadge, ListaTerminow,
                           NajblizszyTermin, SzczegolyTerminu, NumberTicker, SpotlightCard (React)
src/lib/format.ts          daty, „za N dni”, próg pilności (PILNY_DNI = 7)
src/pages/                 index, terminy, termin (?id=), dodaj
src/styles/global.css      zmienne CSS (kolory, fonty, odstępy)
docs/                      dokumentacja PDF
docs/k1/                   materiały K1 (HTML → PDF: Ctrl+P w przeglądarce albo Edge --headless --print-to-pdf)
```

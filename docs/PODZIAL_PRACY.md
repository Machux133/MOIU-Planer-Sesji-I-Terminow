# Podział pracy (2 osoby)

Projekt: **Planer sesji i terminów** · Metody opracowywania interfejsów użytkownika, sem. zimowy 2026/27

Osoba A: ramy, start, lista i szczegóły. Osoba B: formularz, dane i operacje.
Terminy według harmonogramu prowadzącej (K1 17.11, L5 18.11, L6 25.11, K2 02.12, L8 09.12, L9 16.12, oddanie 12.01, pokaz 13.01).

## Osoba A: ramy, start, lista i szczegóły

| Termin | Zadanie | Gdzie w kodzie | Status |
|---|---|---|---|
| do 17.11 (K1) | Mapa ekranów i uzasadnienie modelu nawigacji, makiety low-fi listy i ekranu na wąskim ekranie | PDF K1 | [ ] |
| 18.11 (L5) | Dopracować `Layout`, `Nav` i tokeny CSS (kolory, fonty), sprawdzić spójność na 4 ekranach | `Layout.astro`, `Nav.astro`, `global.css` | [ ] |
| 25.11 (L6) | Ekran startowy: najbliższy termin jako element dominujący (większa karta, liczba dni do terminu) i wyraźny przycisk „Dodaj termin” | `index.astro` | [ ] |
| 25.11 (L6) | Lista: grupowanie lub filtr po przedmiocie, znacznik typu z ikoną i tekstem, wyróżnienie terminów pilnych | `terminy.astro`, nowy `TerminCard.astro` i `TypBadge.astro` | [ ] |
| 02.12 (L7) | Wybór dwupanelowy na szerokim ekranie (lista + szczegóły obok), na wąskim przejście na osobny ekran | `terminy.astro`, `termin.astro` | [ ] |
| 02.12 (L7) | Czytelny ekran szczegółów (układ, data i dni do terminu, puste pola jako „brak”) | `termin.astro` | [ ] |
| 09.12 (L8) | Wąski ekran: układ w jednej kolumnie, cele dotyku, test w narzędziach deweloperskich telefonu | CSS | [ ] |
| 09.12 (L8) | Kontrast 4,5:1 (DevTools) i sprawdzenie, że kolor nie jest jedynym nośnikiem informacji | CSS, komponenty | [ ] |

## Osoba B: formularz, dane i operacje

| Termin | Zadanie | Gdzie w kodzie | Status |
|---|---|---|---|
| do 17.11 (K1) | Lista min. 6 wzorców (gdzie i dlaczego), makieta formularza | PDF K1 | [ ] |
| 18.11 (L5) | Repozytorium: konwencje gałęzi i PR-ów, pierwszy commit i push, sprawdzenie, że oboje uruchamiacie projekt | repo, `README.md` | [ ] |
| 25.11 (L6) | Formularz: pola z etykietami (przedmiot jako lista wyboru, typ jako przyciski wyboru, natywne `date` i `time`, przypomnienie z domyślną wartością „1 dzień”), tylko potrzebne pola | `dodaj.astro` | [ ] |
| 25.11 (L6) | Walidacja: reguły w `validate.ts` (np. data nie z przeszłości), komunikaty przy polach przez `aria-describedby`, wpisane dane nie znikają po błędzie, fokus na pierwszym błędnym polu | `validate.ts`, `dodaj.astro` | [ ] |
| 25.11 (L6) | Zapis przez `save()` i przekierowanie do listy z komunikatem potwierdzającym | `dodaj.astro` | [ ] |
| 02.12 (L7) | Tryb edycji (`?id=` w formularzu) i przyciski „Edytuj termin” oraz „Usuń termin” na szczegółach | `dodaj.astro`, `termin.astro` | [ ] |
| 02.12 (L7) | Usuwanie z możliwością „Cofnij” (`remove()` zwraca usunięty termin) albo z potwierdzeniem | `termin.astro`, `store.ts` | [ ] |
| 02.12 (L7) | Obsługa klawiaturą całego przepływu (kolejność Tab, Enter w formularzu, widoczny fokus) | wszystkie strony | [ ] |
| 09.12 (L8) | Dostępność formularza: etykiety, komunikaty błędów odczytywane przez czytnik ekranu | `dodaj.astro` | [ ] |

## Wspólne

- [ ] **K1 (do 17.11):** każda osoba pisze swoją część, jedna składa PDF i oddaje w Teams.
- [ ] **Wzajemne przeglądy:** każdy PR sprawdza druga osoba i prosi autora o wyjaśnienie, co zmienił (pytania o kod dostaje każdy osobno).
- [ ] **Przed K2 (30.11–01.12):** wspólne przejście przepływu start → lista → szczegóły → dodaj → edytuj → usuń i próba pokazu na 5 minut.
- [ ] **Dokumentacja (L9, 16.12):** A pisze rozdziały o nawigacji, układzie i wąskim ekranie, B o formularzach i dostępności formularza. Wspólnie: samoocena 10 praktyk, rozdział 12 (uruchomienie), opis użycia AI, źródła ikon i fontów.
- [ ] **Przed oddaniem (do 12.01):** PDF w `docs/`, uzupełnione README (numery albumów, link do dokumentacji), test na czystym klonie: `git clone`, `npm install`, `npm run dev`.

Zasada: tylko minimum z karty projektu, bez dodatkowych funkcji.

# Logis — Interní logistika a rezervace

## Kontext projektu
Funkční UI/UX prototyp pro rodinnou firmu se 6 sportovními prodejnami (35 zaměstnanců). Řeší interní logistiku — přesuny zboží mezi pobočkami, rezervace pro zákazníky, evidenci vad. MVP kategorie: Obuv.

## Zdrojová dokumentace
- `Projdocs/INTERNÍ LOGISTIKA A REZERVACE_revised.TXT` — zadání v2.0 (kontext, JTBD, architektura, stavový model)
- `Projdocs/PAB_Logis_v1.md` — Product Architecture Blueprint (detailní specifikace obrazovek, user flows, mermaid diagramy)
- `Projdocs/UAT_Logis.md` — 76 testovacích případů, 22 akceptačních kritérií

## Tech stack
- **Next.js 16** + TypeScript + Tailwind CSS
- **Zustand** — stavový management (src/lib/store.ts)
- **lucide-react** — ikony
- **date-fns** — nainstalováno, zatím nepoužito
- Žádný backend — vše dummy data v `src/lib/data.ts`

## Struktura aplikace (`logis-app/`)
```
src/
├── app/
│   ├── page.tsx          — hlavní SPA (routing přes Zustand store, postMessage listener pro preview)
│   ├── preview/
│   │   └── page.tsx      — desktop preview s iPhone/iPad rámečkem, sidebar navigace
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── types.ts          — TypeScript typy (Role, TransferStatus, ReservationStatus, entity...)
│   ├── data.ts           — dummy data (6 prodejen, 35 uživatelů, 15 produktů, rezervace, přesuny, vady, notifikace, audit log) + helpery (calculateATP, getStatusLabel, getStatusColor...)
│   └── store.ts          — Zustand store (Screen type export, login/logout/navigate/select*)
├── components/
│   ├── LoginScreen.tsx       — 2×3 mřížka prodejen + řidiči/vedení, PIN vstup (klávesnice + numpad), sticky žlutý banner
│   ├── Header.tsx            — horní lišta (název pobočky, sync indikátor, zvonek, logout)
│   ├── BottomNav.tsx         — spodní navigace dle role
│   ├── DashboardVedouci.tsx  — aktivní rezervace, ke schválení (jen vedoucí), poslední aktivita
│   ├── DashboardRidic.tsx    — manifest s accordion pobočkami, progress bar, uzavření směny
│   ├── DashboardMajitel.tsx  — arbitráže, ATP přehled sítě, denní statistika
│   ├── SearchScreen.tsx      — vyhledávání SKU, tabulka ATP, kontextové akce
│   ├── ReservationForm.tsx   — formulář rezervace pro zákazníka
│   ├── TransferForm.tsx      — formulář požadavku na přesun
│   ├── ApprovalDetail.tsx    — schvalování (vedoucí zdrojové prodejny)
│   ├── ArbitrageDetail.tsx   — arbitráž (majitel)
│   ├── ScanScreen.tsx        — simulace skenování EAN
│   ├── MyReservations.tsx    — seznam rezervací s filtry
│   ├── ReservationDetail.tsx — detail rezervace, prodloužení, zrušení
│   ├── DamagesScreen.tsx     — evidence vad, nahlášení/vyřešení
│   ├── NotificationsScreen.tsx — chronologický seznam notifikací
│   └── AuditLogScreen.tsx    — audit log s filtry (jen majitel)
```

## Klíčové implementační detaily
- **Routing**: Není Next.js router — vše je SPA na `/`, obrazovky se přepínají přes `useAppStore().navigate(screen)`
- **Preview**: `/preview` zobrazuje `/` v iframe, navigace přes `postMessage({ type: 'logis-navigate', screen })`, hlavní app naslouchá a auto-loginuje správnou roli
- **ATP výpočet**: `calculateATP(productId, storeId) = erpStock - activeReservations - unresolvedDamages`
- **PINy**: Sjednocené dle role — vedoucí 1234, prodavač 1111, řidič 5555, majitel 9999
- **Dummy data**: Cutoff 15.2.2025, stavy požadavků pokrývají celý stavový model (REQUESTED, APPROVED, IN_TRANSIT, DISPUTED, DELIVERED, CLOSED, RETURNED_TO_SOURCE)
- **Česká diakritika**: Všechny UI texty mají správné háčky a čárky
- **Žlutý banner**: Sticky nahoře na login stránce + v sidebaru preview stránky

## GitHub
https://github.com/veraklabanova/logis

## Co zbývá implementovat (ze zadání)
- Offline PWA podpora (service worker)
- Skutečná EAN skenování (kamera)
- ERP API integrace (nyní mock data)
- CSV export (18:00 denní dávka)
- Automatická expirace rezervací (timer/worker)
- Push notifikace
- Atomická kontrola ATP (concurrency)

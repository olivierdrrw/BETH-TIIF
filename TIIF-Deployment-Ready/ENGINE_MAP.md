# TIIF — Uko Engine za Human Twin/Intelligence zimeze (Engine Map)

Iyi documenti ntabwo ari "duplicate zose zakuweho" — ni ubufasha ku wubaka
akazi kazaza kugira ngo amenye ni izihe ari CANONICAL (ukoresha) n'izihe ari
orphaned (unused ariko si ikosa, ni forward-looking infrastructure).

## Canonical (koresha izi mu bazakurikira)

- **Personal Human Twin scoring**: `core/human-twin/score-engine.ts`
  (`calculateScores`) — ikoreshwa n'ibintu 8 muri app (chat, cards, prediction).
- **Personal insights/prediction/roadmap**: `features/human-twin/services/{insight,prediction,roadmap}-engine.ts`
- **Personal Human Twin store (live UI state)**: `features/human-twin/store/use-human-twin-store.ts`
  (`useHumanTwinStore` / `useHumanTwin()` hook)
- **Human Twin Firestore repository**: `repositories/human-twin.repository.ts`
  (`HumanTwinRepository.getByUser`)
- **Memory Vault**: `lib/memory/*` (pattern/growth/risk detectors + insight generator)

## Institutional/Population layer (SEPARATE kuva ku ya "personal" — atari duplicate,
## ni ikindi kigero cy'amakuru — population-level, atari per-user)

`lib/tiif/*` ni ubwoko bunini bw'engine zigenewe amashuri/imiryango/leta
(School/University/Corporate/Regional/National Intelligence — category 14 na 30
mu cyerekezo cyawe). Nyinshi muri zo ntizirahujwe na page kuko dashboards
z'amashuri/leta ntizirubakwa (nk'uko byavuzwe muri GAP_ANALYSIS.md).

Zimwe zarahujwe muri iki gikorwa:
- `lib/tiif/{risk-forecast,wellness-forecast}-engine.ts` → ubu bikoreshwa muri
  **Admin → Population Forecast** (nashyizemo iki gikorwa gishize).
- `lib/tiif/{regional-risk,wellness-index}-engine.ts` → bikoreshwa na
  `services/dashboard/get-national-dashboard.ts` (nta page iyihuriyeho, ni forward-looking).

Izisigaye (nka `school-intelligence-engine.ts`, `research-report-engine.ts`,
`policy-recommendation-engine.ts`...) ni logic nyayo (ntabwo ari ubusa), ariko
nta page zihuriyeho. Sinazikuyeho kuko ari forward-looking infrastructure ku
cyerekezo cyawe (category 14 Organization, 30 National Intelligence) — niba
utazikeneye rwose, ushobora kuzikuraho, ariko sinabikoze automatique kuko
bishobora kuba akazi wari uzfirikanyeho gukomeza.

## `lib/human-twin/*` (verisiyo ya kera, orphaned)

Files nka `calculate-human-twin.ts`, `initialize-human-twin.ts`,
`prediction-engine.ts`, `risk-engine.ts` muri iyi folder ni verisiyo ya MBERE
y'ibyo nakoze muri `core/human-twin/` na `features/human-twin/services/`.
Ntabwo bikoreshwa ahandi (nagenzuye — orphaned). Ni bwo bwoko bwa 14
bwavuzwe muri raporo ya mbere. Nibura si ubusa, ni logic nziza ariko yasimbuwe.
Ushobora kuyikuraho udatinya (nta na kimwe kizamenya).

## Icyo nakoze uyu munsi ariko sinigeze nkora (ni ukubireba)

Sinasibye izi files zose ku mpamvu ebyiri:
1. Zimwe (`lib/tiif/*`) ni forward-looking infrastructure ku bice bitarubakwa
   (School/Government dashboards) — gusiba byaba gusiba akazi ushobora kuzakenera.
2. Sinari mfite uburyo bwo gukora `npm run build` kugira ngo menye neza ko
   gusiba bidasenya ikintu naba ntarabonye (static analysis yanjye ntabwo
   100% yizewe kuruta build nyayo).

Niba ushaka gusiba burundu izi files zidakoreshwa, koresha Claude Code kuri
mudasobwa yawe — arashobora gukora `npm run build` nyuma ya buri gusiba
kugira ngo yizere ko nta kintu yasenye.

# TIIF — Deployment Guide (Windows + GitHub + Firebase + Vercel)

Iyi guide ikoreshwa hamwe na `TIIF_Deployment_Ready.zip`. Yandikiwe Windows PowerShell, ikurikiza setup y'iyi project.

> **Icyitonderwa ku mutekano:** ZIP ya mbere wari watanze yarimo `.env.local` ifite credentials za services. Ntukongere gushyira iyo file muri GitHub. Fata secret keys zari muri iyo ZIP nk'izishobora kuba zaragaragaye: rotate/revoke OpenAI key, LiveKit API key/secret, Stripe secret key niba yari production, na `NEXTAUTH_SECRET` niba igikoreshwa ahandi. Firebase web config (`NEXT_PUBLIC_FIREBASE_*`) si secret ya server ariko igomba kurindwa na Authentication authorized domains na Security Rules.

## 1. Ibyo ugomba kuba ufite

- GitHub account
- Vercel account
- Firebase project (Authentication, Firestore, Storage)
- OpenAI API key
- LiveKit account niba video calling izakoreshwa
- Stripe account niba subscriptions/payments zizakoreshwa
- Node.js 24 LTS na Git byashyizwe kuri Windows

Node.js 24 ni LTS. Reba version ya Node kuri `nodejs.org`; project yashyizwe kuri Node `24.x` binyuze muri `.nvmrc`, `package.json` na Netlify config.

## 2. Fungura project neza

1. Kuramo ZIP.
2. Extract All uyishyire ahantu horoshye, urugero `C:\Users\YOUR_USER\Desktop\TIIF-Deployment-Ready`.
3. Fungura folder nyirizina irimo `package.json` muri VS Code cyangwa Cursor.
4. Muri VS Code, hitamo **Terminal → New Terminal**.
5. Koresha:

```powershell
node --version
npm --version
git --version
```

`node --version` igomba kugaragaza `v24.x.x`.

Niba Node itariho cyangwa version itari 24, shyiraho Node.js 24 LTS kuri https://nodejs.org/en/download/ hanyuma ufunge wongere ufungure PowerShell.

## 3. Kora environment file ya local

Muri root folder irimo `package.json`, kora:

```powershell
Copy-Item .env.example .env.local
```

Fungura `.env.local` ushyiremo values za Firebase, OpenAI n'izindi services ukoresha. `FIREBASE_SERVICE_ACCOUNT_JSON` isabwa kuri server-side Firebase Admin SDK. Ntushyire secrets muri variables zitangira na `NEXT_PUBLIC_`.

**Ntukohereze `.env.local` kuri GitHub.** `.gitignore` iri muri project iyirinda, ariko banza ugenzure `git status` mbere yo gukora push.

## 4. Install dependencies no kugenzura project

Muri terminal, uri muri folder irimo `package.json`:

```powershell
npm install
```

Iyi package intentionally ntabwo irimo stale `package-lock.json` yari ihuye na dependency version ya mbere. `npm install` izakora lockfile nshya ihuye na `package.json`. Iyo install irangiye, genzura:

```powershell
npm run type-check
npm run lint
npm run build
```

Cyangwa byose icyarimwe:

```powershell
npm run check
```

Niba hari error:

1. Soma error ya mbere nyayo muri terminal.
2. Kora fix muri source file yerekanywe.
3. Ongera ukoreshe command yatsinzwe.
4. Ntukoreshe `ignoreBuildErrors`, `@ts-nocheck`, cyangwa ngo uhagarike ESLint kugira ngo deployment isa n'iyatsinze.

Iyo `npm run build` irangiye nta error, gerageza local production server:

```powershell
npm run start
```

`npm run start` isaba ko `npm run build` yabanje gutsinda. Fungura `http://localhost:3000`.

## 5. Tegura Firebase project

1. Jya kuri https://console.firebase.google.com/ ufungure project ya TIIF cyangwa ukore nshya.
2. Muri **Project settings → General**, andika Firebase Project ID.
3. Muri **Authentication → Sign-in method**, enable providers mukoresha (nibura Email/Password; Google niba ikoreshwa na app).
4. Muri **Authentication → Settings → Authorized domains**, ongeramo:
   - `localhost` (local development)
   - Vercel domain yawe, urugero `your-project.vercel.app`
   - custom domain yawe nyuma yo kuyihuza.
5. Muri **Firestore Database**, kora database mu buryo bukwiye ku mushinga.
6. Muri **Storage**, setup bucket.
7. Kuva muri root folder ya project, shyiraho Firebase CLI:

```powershell
npm install -g firebase-tools
firebase login
```

8. Deploy Firestore rules, indexes na Storage rules:

```powershell
firebase deploy --only firestore:rules,firestore:indexes,storage --project YOUR_FIREBASE_PROJECT_ID
```

Simbuza `YOUR_FIREBASE_PROJECT_ID` na project ID nyayo. Itegeko ryo kohereza rules risimbuza rules zisanzwe ziri muri Firebase Console n'iziri muri files z'iyi project; banza ugenzure rules niba ufite production data.

## 6. Kora Firebase Admin service account

Server APIs zikeneye Firebase Admin SDK.

1. Muri Firebase Console, jya kuri **Project settings → Service accounts**.
2. Hitamo **Generate new private key**.
3. Bika JSON file ahantu hizewe hanze ya project folder, urugero `C:\TIIF-Secrets\firebase-service-account.json`.
4. Ntuyishyire muri GitHub, ZIP cyangwa chat.
5. Muri Vercel Environment Variables, shyiramo variable `FIREBASE_SERVICE_ACCOUNT_JSON` value ikaba ari **content yose ya JSON file**, ntabwo ari file path.

`FIREBASE_SERVICE_ACCOUNT_PATH` ikoreshwa gusa na script yo gutanga initial admin role kuri local machine. Ntuyishyire muri Vercel.

## 7. Tegura OpenAI, LiveKit na Stripe

Shyira variables zikenewe muri `.env.local` kuri local, no muri Vercel nk'uko biri mu gice cya 10.

### OpenAI

- Kora API key kuri https://platform.openai.com/api-keys
- Shyira muri `OPENAI_API_KEY`.
- Ntuyishyire muri browser code cyangwa variable itangira na `NEXT_PUBLIC_`.

### LiveKit (video)

- Kora LiveKit project.
- Shyira secure WebSocket URL (igomba gutangira `wss://`) muri `LIVEKIT_URL` na `NEXT_PUBLIC_LIVEKIT_URL`.
- Shyira API key muri `LIVEKIT_API_KEY` na secret muri `LIVEKIT_API_SECRET`.
- API token endpoint y'iyi project igenzura ko booking iri confirmed kandi user ari umwe mu bayitabiriye. Uko booking `therapistId` ibikwa bigomba kuba bihuye na Firebase Auth UID ya therapist.

### Stripe (subscriptions)

- Shyira secret key muri `STRIPE_SECRET_KEY`.
- Kora webhook endpoint kuri `https://YOUR_DOMAIN/api/stripe/webhook`.
- Hitamo events zikoreshwa n'iyi implementation: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
- Shyira webhook signing secret muri `STRIPE_WEBHOOK_SECRET`.
- Shyira Stripe Price IDs za plans uko zikenewe: `STRIPE_PRICE_STUDENT`, `STRIPE_PRICE_PREMIUM`, `STRIPE_PRICE_FAMILY`, `STRIPE_PRICE_PROFESSIONAL`, `STRIPE_PRICE_THERAPIST_PRO`, `STRIPE_PRICE_SCHOOL`, `STRIPE_PRICE_UNIVERSITY`.
- Banza ukoreshe Stripe test mode, ugerageze webhook, hanyuma ujye kuri live mode umaze kwemeza flow yose.

## 8. Kora GitHub repository

Kora **private repository** kuri GitHub niba project irimo code n'uburyo bw'imbere butarashyirwa public. Ntukoreshe secrets muri commit.

Muri PowerShell, muri root folder ya project:

```powershell
git status
git init
git add .
git status
git commit -m "Prepare TIIF deployment"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Simbuza URL n'iya repository yawe. Niba wari usanzwe ufite Git repository na remote, **ntusubiremo `git init` cyangwa `git remote add origin`**. Ahubwo ukoresha:

```powershell
git remote -v
git add .
git status
git commit -m "Apply deployment hardening"
git push
```

Niba `git status` igaragaza `.env.local`, `service-account.json`, `.pem` cyangwa secret files, **hagarika**; ntukore commit. Siba file kuri staging ukoreshe `git rm --cached .env.local` (ntibisiba local file), wongere ugenzure `.gitignore`.

## 9. Deploy ukoresheje Vercel (recommended)

1. Jya kuri https://vercel.com/ winjire.
2. Hitamo **Add New → Project**.
3. Connect GitHub account, hitamo TIIF repository.
4. Kuri **Root Directory**, hitamo folder irimo `package.json` (niba repository root ari TIIF project, usige `./`).
5. Framework preset: **Next.js**.
6. Node.js version: **24.x** niba dropdown ibigaragaza; project nayo ifite `.nvmrc` na `engines.node` 24.x.
7. Usige build command ari default `next build` (cyangwa `npm run build`). Output directory usige default ya Next.js; ntuyishyireho `public`.
8. Mbere ya Deploy, shyiramo environment variables ziri mu gice gikurikira.
9. Hitamo Deploy.

Vercel izakora Preview/Production deployment ishingiye kuri Git branch settings. Iyo uhinduye environment variables, kora redeploy kugira ngo deployment nshya izikoreshe.

## 10. Environment variables zo gushyira muri Vercel

Jya kuri **Project → Settings → Environment Variables**. Shyiramo values z'ukuri kuri Production, Preview na Development aho bikenewe. Ntukoreshe values z'urugero ziri muri `.env.example`.

### Firebase web configuration (client-visible)

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

### Server-only credentials

- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY` (niba Stripe ikoreshwa)
- `STRIPE_WEBHOOK_SECRET` (niba Stripe ikoreshwa)
- `LIVEKIT_API_KEY` (niba video ikoreshwa)
- `LIVEKIT_API_SECRET` (niba video ikoreshwa)
- `LIVEKIT_URL` (niba video ikoreshwa; `wss://...`)

### Values zikoreshwa n'interface / URLs

- `NEXT_PUBLIC_APP_NAME=TIIF`
- `NEXT_PUBLIC_APP_URL=https://YOUR_VERCEL_DOMAIN`
- `NEXT_PUBLIC_LIVEKIT_URL=wss://YOUR_LIVEKIT_HOST` (niba video ikoreshwa)
- Stripe price IDs ziri mu gice cya Stripe hejuru.

**Ntushyire `FIREBASE_SERVICE_ACCOUNT_PATH` muri Vercel. Ntushyire server secrets muri `NEXT_PUBLIC_*`.**

## 11. Tanga `super_admin` role ya mbere

Iyi ni operation y'ingenzi. Koresha Firebase UID ya account yawe bwite kandi yizewe.

1. Banza ukore account yawe muri Firebase Authentication, ukoreshe email yawe.
2. Muri Firebase Console → Authentication → Users, copy UID yawe.
3. Muri PowerShell ya local project, shyira path ya service account file:

```powershell
$env:FIREBASE_SERVICE_ACCOUNT_PATH = "C:\TIIF-Secrets\firebase-service-account.json"
node .\scripts\set-initial-admin.mjs "PASTE_YOUR_FIREBASE_UID_HERE"
Remove-Item Env:FIREBASE_SERVICE_ACCOUNT_PATH
```

4. Sohoka muri app wongere winjire kugira ngo Firebase ID token ibone custom claim nshya.
5. Ntukore admin role y'abandi bantu ukoresheje script ya initial bootstrap. Koresha role-management process yizewe.

## 12. Smoke tests mbere yo gutangaza public launch

Koresha Preview deployment ubanze. Gerageza ibi:

- Homepage na assets byose birafunguka.
- Signup, login, logout na password reset.
- User A ntashobora gusoma cyangwa guhindura private data ya User B.
- User ntashobora kwiha `super_admin`, therapist cyangwa izindi privileged roles.
- Journal, mood, habits na wellness flows.
- AI endpoints zanga request itarimo Firebase ID token.
- AI Companion isubiza neza, kandi API key ntigaragara muri browser/network response.
- Video token ihabwa gusa participant wa confirmed booking.
- Stripe test checkout na webhook; plan ihinduka gusa nyuma ya signed webhook.
- Admin pages/API byanga user usanzwe.
- Avatar/file uploads zigenzurwa na Storage Rules.
- Responsive layout kuri phone na desktop.
- Reba Vercel Function Logs, Firebase usage/errors, Stripe webhook delivery na LiveKit logs.

Ntukore public launch kugeza tests z'ingenzi zatsinze.

## 13. Niba deployment yanze

1. Fungura Vercel → Project → Deployments → hitamo deployment yanze → **Build Logs**.
2. Shaka error ya mbere (first actionable error), ntutangire ku warnings zo hasi.
3. Reba ko **Root Directory** irimo `package.json`.
4. Reba ko Vercel environment variables zose zashyizweho kuri Production.
5. Reba Node 24.x.
6. Kuri local, kora `npm install`, hanyuma `npm run type-check`, `npm run lint`, `npm run build`.
7. Ohereza error log utarimo secrets kugira ngo dukomeze kuyikosora.

## 14. Netlify alternative

Project ifite `netlify.toml` na Next.js plugin. Ushobora guhitamo Netlify → Add new site → Import from Git → GitHub repository. Root directory igomba kuba irimo `package.json`; Node version 24. Environment variables zishyirwaho muri Site configuration → Environment variables. Ntushyireho output directory itari iya Next.js plugin; kurikiza `netlify.toml` iri muri project.

Vercel ni yo nzira ya mbere nasaba kuri Next.js kugira ngo deployment ibe direct kandi idafite extra adapter.

## 15. Known limitations / must-finish before public scale

- Dependency installation na production build byagombaga gusubirwamo muri environment ifite access kuri npm registry. Iyi preparation environment ntiyashoboye kugera kuri `registry.npmjs.org`, bityo nta claim ko `npm run build` yatsinze.
- Static syntax/import scan yakozwe ku source, ariko ntabwo isimbura TypeScript check, ESLint, production build cyangwa runtime tests.
- Hari files 83 ziri empty muri source archive. Ntabwo zigaragara nk'imports zabuze muri static scan yakozwe, ariko zigaragaza modules zitarimo implementation. Subiramo feature-by-feature audit kugira ngo umenye niba hari feature yateganyijwe itararangira.
- Rate limiter iri muri process memory. Ntihuzwa hagati ya Vercel serverless instances, bityo uyisimbuze shared/distributed limiter (urugero Redis/Upstash) mbere ya high-volume public launch.
- Firestore composite queries zishobora gusaba additional indexes. Iyo Firebase igusabye index, reba query, ongeramo index muri `firestore.indexes.json`, uyideploy; ntukore index blindly.
- Menya neza ko `therapistId` muri `therapy_bookings` ari Firebase Auth UID ya therapist, kugira ngo video authorization ibe ihuye n'identity.
- Iyi package ntabwo yemeza ISO certification, GDPR/Rwanda-law compliance, clinical validation cyangwa medical-device status. Kora legal/privacy assessment na security review mbere yo gukoresha sensitive information ku rugero runini.

## Official references

- Node.js releases: https://nodejs.org/en/about/previous-releases
- Next.js deployment: https://nextjs.org/docs/app/getting-started/deploying
- Vercel Next.js: https://vercel.com/docs/frameworks/nextjs
- Vercel environment variables: https://vercel.com/docs/environment-variables
- Firebase CLI: https://firebase.google.com/docs/cli
- Firebase Rules deployment: https://firebase.google.com/docs/rules/manage-deploy
- Firebase Admin SDK: https://firebase.google.com/docs/admin/setup
- Stripe webhooks: https://docs.stripe.com/webhooks
- LiveKit token generation: https://docs.livekit.io/home/server/generating-tokens/
- OpenAI API keys: https://platform.openai.com/api-keys

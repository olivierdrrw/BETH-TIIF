# TIIF — Human Development & Wellbeing Operating System

TIIF (Trauma-Informed Identity Framework™) is a human-centered platform connecting identity, wellbeing, reflection, goals, habits, purpose, relationships, growth and intelligent guidance into a continuous development journey.

## Technology

- Next.js App Router / React / TypeScript
- Firebase Authentication, Cloud Firestore and Cloud Storage
- Firebase Admin SDK for trusted server-side operations
- OpenAI API for AI-powered experiences
- LiveKit for authorized video sessions
- Stripe for subscription and payment workflows

## Requirements

- Node.js 24.x (see `.nvmrc`)
- npm 10+ (bundled with supported Node 24 releases)
- A Firebase project for authentication, Firestore and Storage

## Quick start (Windows PowerShell)

```powershell
# Run this from the directory that contains package.json
node --version
npm --version
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

Before running the full checks, configure the variables in `.env.local` using `.env.example` as a checklist. Never commit `.env.local` or service-account keys.

## Quality checks

```powershell
npm run type-check
npm run lint
npm run build
```

Or run all three in sequence:

```powershell
npm run check
```

Create and commit the npm lockfile after the first successful `npm install`. Use `npm ci` for subsequent clean, reproducible installs.

## Deployment

Read [`DEPLOYMENT_GUIDE_KY.md`](./DEPLOYMENT_GUIDE_KY.md) for the complete Firebase + GitHub + Vercel deployment procedure, required environment variables, security setup and smoke tests.

## Important security notes

- `.env.local` and all real API keys/service-account JSON files must stay outside Git.
- Firebase web configuration variables beginning with `NEXT_PUBLIC_` are client-visible. Protect the Firebase project with Authentication settings and Security Rules.
- `FIREBASE_SERVICE_ACCOUNT_JSON`, `OPENAI_API_KEY`, `LIVEKIT_API_SECRET`, `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are server-only secrets.
- Assign the first `super_admin` role only to a trusted Firebase Authentication UID using `scripts/set-initial-admin.mjs`.
- Video tokens are issued only for confirmed bookings where the requesting user is a participant.
- The process-local API rate limiter is a baseline guard, not a distributed production rate-limiting service. Replace it with a shared store before high-volume public launch.

## Project status

This package contains static repairs and deployment hardening based on the supplied source archive. A clean dependency installation and full Next.js production build could not be completed in the preparation environment because the npm registry was unreachable. Run the quality checks above on a machine with registry access before promoting a deployment to production.

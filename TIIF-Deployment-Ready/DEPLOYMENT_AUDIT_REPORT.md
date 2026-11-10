# TIIF Deployment Preparation — Audit Report

**Prepared:** 10 November 2026  
**Scope:** Static source review and deployment hardening of the supplied TIIF archive.  
**Important:** This is not a certification, penetration test, or proof of a successful production build.

## Summary

The source archive contained a deployable Next.js application structure, Firebase integrations, Stripe checkout/webhook code, LiveKit video features, OpenAI routes, and substantial feature modules. Several configuration, authorization, code-contract, and operational issues were identified and patched in the prepared working copy.

## Changes applied in this package

- Updated Next.js and the matching Next ESLint configuration to `16.4.6`.
- Added Firebase Admin SDK dependency `14.5.0` for trusted server-side token verification and database operations.
- Replaced the obsolete `next lint` script with `eslint .`.
- Added a combined `npm run check` command for TypeScript, lint and production build.
- Pinned the project to Node.js `24.x` through `.nvmrc`, `package.json`, and Netlify configuration.
- Added Firebase Admin initialization and Firebase ID-token verification for protected server API routes.
- Tightened role handling so client-editable profile data cannot grant privileged roles or billing entitlements; trusted roles are based on Firebase custom claims.
- Hardened Stripe checkout/webhook handling so the application relies on signature-verified webhook events rather than trusting a client redirect.
- Restricted LiveKit token issuance to a participant in a confirmed booking and derive the room name on the server.
- Added baseline per-user request throttling for selected sensitive endpoints.
- Added Firestore rules for user-owned data, messaging, bookings, roles and related product collections.
- Added Firebase Storage rules for user-owned images/files and Firestore index configuration.
- Added `.env.example`, deployment documentation, and a security-focused README.
- Removed real `.env.local` files and secret-bearing files from the release package.

## Static checks

The latest static scan of the prepared source reported:

- 1,038 source files scanned.
- 1,582 import statements examined.
- 0 unresolved local imports in the scan.
- 0 syntax/transpilation errors in the scan.
- 83 empty source files detected. These were not identified as unresolved imports in the static scan, but they may represent unfinished or placeholder capabilities and should be reviewed feature by feature.

These checks do **not** replace `tsc --noEmit`, ESLint, `next build`, browser tests or Firebase Emulator tests.

## Verification blocker

A full dependency install could not be completed in the preparation environment because DNS/network access to `registry.npmjs.org` failed (`EAI_AGAIN`). Therefore:

- no fresh npm lockfile was generated here;
- no complete TypeScript check could be certified;
- no ESLint run could be certified;
- no production Next.js build could be certified;
- no end-to-end deployed runtime test was performed.

On the user's machine with npm registry access, run `npm install`, then `npm run type-check`, `npm run lint`, and `npm run build`. Keep the generated `package-lock.json` in Git for reproducible subsequent installs.

## Known production hardening still required

1. The built-in API rate limiter stores counters in process memory. It is not shared between serverless instances. Replace it with a shared rate-limiting backend or platform edge protection before significant public traffic.
2. Validate every Firestore query used by the application against deployed composite indexes. Add any additional indexes requested by Firestore to `firestore.indexes.json` and redeploy them.
3. Confirm that `therapy_bookings.therapistId` stores the therapist's Firebase Authentication UID. The LiveKit authorization check depends on that identifier matching the authenticated UID.
4. Use Firebase Emulator Suite or an equivalent isolated test project to test all Firestore and Storage rules before deploying rules over an existing production project.
5. Review data retention, consent, deletion/export flows, incident response, youth safeguarding, clinical boundaries, and applicable privacy/legal requirements before processing sensitive data at scale.
6. Configure backups, monitoring, error reporting, deployment protection, and incident response for production.

## Secret exposure warning

The source ZIP supplied for review contained `.env.local` with server-side credentials. Those values are deliberately excluded from this release package and are not reproduced in this report. Treat the exposed OpenAI, LiveKit and Stripe secrets as compromised and rotate/revoke them where applicable. Regenerate `NEXTAUTH_SECRET` if that secret is used by any active service. Firebase web configuration values beginning with `NEXT_PUBLIC_` are client-visible, but Firebase Authentication authorized domains, Firestore rules and Storage rules must still be configured securely.

## Release decision

**Status: Prepared for local verification and GitHub/Vercel setup — not yet certified production-ready.**

Proceed to Vercel Preview only after local dependency installation, type-check, lint and build all pass. Complete the smoke-test checklist in `DEPLOYMENT_GUIDE_KY.md` before promoting to Production.

// Re-exports the single canonical Firebase app instance.
// (Kept as a separate file since features/avatar/services/upload-avatar.ts
// imports from this path — but there must only ever be ONE initializeApp
// call in the whole project, or Firebase throws "app already exists".)
export { app } from "./firebase";

import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-center">
      <WifiOff size={32} className="text-slate-500" />
      <h1 className="text-xl font-semibold text-white">You're offline</h1>
      <p className="max-w-sm text-sm text-slate-400">
        Check your connection — TIIF needs an internet connection to sync your data.
      </p>
    </div>
  );
}

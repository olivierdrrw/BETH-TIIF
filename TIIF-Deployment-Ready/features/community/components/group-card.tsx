import { Users } from "lucide-react";
import type { CommunityGroup } from "../types/group";

export function GroupCard({ group }: { group: CommunityGroup }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white">{group.name}</h4>
        <span className="rounded-full bg-navy-500/10 px-2 py-0.5 text-xs text-navy-300">
          {group.category}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-400">{group.description}</p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
        <Users size={13} />
        {group.memberCount} members
      </div>
    </div>
  );
}

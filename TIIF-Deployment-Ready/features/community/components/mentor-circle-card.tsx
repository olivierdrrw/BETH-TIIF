import { GraduationCap, Users } from "lucide-react";
import type { MentorCircle } from "../mentor-circles";

export function MentorCircleCard({ circle }: { circle: MentorCircle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
          <GraduationCap size={15} />
        </div>
        <div>
          <h4 className="font-medium text-white">{circle.mentorName}</h4>
          <p className="text-xs text-slate-500">{circle.topic}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <Users size={13} />
        {circle.members} members
      </div>
    </div>
  );
}

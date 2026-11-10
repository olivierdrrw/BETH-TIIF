"use client";

import { LivingEngine } from "../engine/living-engine";
import { PreviewSidebar } from "./preview-sidebar";
import { PreviewTopbar } from "./preview-topbar";
import { PreviewGrid } from "./preview-grid";

export function DashboardPreview() {
  return (
    <LivingEngine>

      <div
        className="
        overflow-hidden
        rounded-[40px]
        border
        border-white/[0.08]
        bg-[#07111f]/90
        backdrop-blur-3xl
        shadow-[0_40px_120px_rgba(0,0,0,.35)]
      "
      >
        <div className="flex">

          <PreviewSidebar />

          <div className="flex-1">

            <PreviewTopbar />

            <PreviewGrid />

          </div>

        </div>

      </div>

    </LivingEngine>
  );
}
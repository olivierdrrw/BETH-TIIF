"use client";

import { useEffect, useState } from "react";

/**
 * A soft light that follows the cursor, adding subtle depth to hero and
 * marketing sections. Renders nothing on touch devices.
 */
export function CursorGlow() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!position) return null;

  return (
    <div
      className="pointer-events-none fixed z-0 h-72 w-72 rounded-full bg-navy-500/10 blur-3xl transition-transform duration-200"
      style={{
        transform: `translate(${position.x - 144}px, ${position.y - 144}px)`,
      }}
    />
  );
}

export default CursorGlow;

"use client";

export function Noise() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        fixed
        inset-0
        z-[1]
        opacity-[0.025]
        mix-blend-soft-light
      "
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
      }}
    />
  );
}

export default Noise;
/**
 * TIIF Design Tokens
 *
 * Production-grade design system for TIIF by Beth Wellness Center.
 * Aesthetic: minimal, calm, and premium — inspired by Apple, Linear, Stripe, and OpenAI.
 *
 * @see PROJECT_RULES.md — TypeScript-first, accessibility-first, mobile-first.
 */

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

const brand = {
  name: "TIIF",
  fullName: "TIIF by Beth Wellness Center",
  tagline: "Trauma-Informed Identity Framework",
} as const;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const palette = {
  primary: {
    50: "#F4F6FA",
    100: "#E8ECF4",
    200: "#C5CDE0",
    300: "#9BA8C4",
    400: "#6B7A9E",
    500: "#475574",
    600: "#323F5C",
    700: "#242F47",
    750: "#132238",
    800: "#161F33",
    850: "#071329",
    900: "#0B1020",
    950: "#020617",
  },
  // Secondary accent for callouts/badges that want to stand apart from the
  // core blue/cyan brand palette — used sparingly, never as a primary CTA color.
  purple: {
    400: "#263D70",
    500: "#263D70",
  },
  secondary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#85A3DE",
    400: "#5D85D1",
    500: "#3E63B0",
    600: "#304D8C",
    700: "#263D70",
    800: "#1E40AF",
    900: "#1E3A8A",
    950: "#172554",
  },
  accent: {
    50: "#EEF2FB",
    100: "#D6E0F5",
    200: "#AEC2EA",
    300: "#85A3DE",
    400: "#5D85D1",
    500: "#3E63B0",
    600: "#304D8C",
    700: "#263D70",
    800: "#1F2D63",
    900: "#141D42",
    950: "#060B18",
  },
  success: {
    50: "#EEF2FB",
    100: "#D6E0F5",
    200: "#AEC2EA",
    300: "#85A3DE",
    400: "#5D85D1",
    500: "#3E63B0",
    600: "#304D8C",
    700: "#263D70",
    800: "#1F2D63",
    900: "#141D42",
    950: "#060B18",
  },
  warning: {
    50: "#EEF2FB",
    100: "#D6E0F5",
    200: "#AEC2EA",
    300: "#85A3DE",
    400: "#5D85D1",
    500: "#3E63B0",
    600: "#304D8C",
    700: "#263D70",
    800: "#1F2D63",
    900: "#141D42",
    950: "#060B18",
  },
  danger: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
    950: "#450A0A",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },
} as const;

const semanticColors = {
  light: {
    background: palette.neutral[0],
    backgroundSubtle: palette.neutral[50],
    backgroundMuted: palette.neutral[100],
    foreground: palette.primary[900],
    foregroundMuted: palette.neutral[600],
    foregroundSubtle: palette.neutral[500],
    border: palette.neutral[200],
    borderStrong: palette.neutral[300],
    ring: palette.secondary[500],
    surface: palette.neutral[0],
    surfaceRaised: palette.neutral[0],
    surfaceOverlay: "rgba(11, 16, 32, 0.4)",
    primary: palette.primary[900],
    primaryForeground: palette.neutral[0],
    secondary: palette.secondary[500],
    secondaryForeground: palette.neutral[0],
    accent: palette.accent[400],
    accentForeground: palette.primary[900],
    success: palette.success[500],
    successForeground: palette.neutral[0],
    successSubtle: palette.success[50],
    warning: palette.warning[500],
    warningForeground: palette.primary[900],
    warningSubtle: palette.warning[50],
    danger: palette.danger[500],
    dangerForeground: palette.neutral[0],
    dangerSubtle: palette.danger[50],
    link: palette.secondary[600],
    linkHover: palette.secondary[700],
    focus: palette.accent[400],
    selection: palette.secondary[100],
  },
  dark: {
    background: palette.primary[900],
    backgroundSubtle: palette.primary[800],
    backgroundMuted: palette.primary[700],
    foreground: palette.neutral[50],
    foregroundMuted: palette.neutral[400],
    foregroundSubtle: palette.neutral[500],
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(255, 255, 255, 0.14)",
    ring: palette.secondary[400],
    surface: palette.primary[800],
    surfaceRaised: palette.primary[700],
    surfaceOverlay: "rgba(0, 0, 0, 0.6)",
    primary: palette.neutral[50],
    primaryForeground: palette.primary[900],
    secondary: palette.secondary[500],
    secondaryForeground: palette.neutral[0],
    accent: palette.accent[400],
    accentForeground: palette.primary[900],
    success: palette.success[400],
    successForeground: palette.primary[900],
    successSubtle: "rgba(93, 133, 209, 0.12)",
    warning: palette.warning[400],
    warningForeground: palette.primary[900],
    warningSubtle: "rgba(48, 77, 140, 0.12)",
    danger: palette.danger[400],
    dangerForeground: palette.neutral[0],
    dangerSubtle: "rgba(239, 68, 68, 0.12)",
    link: palette.secondary[400],
    linkHover: palette.secondary[300],
    focus: palette.accent[400],
    selection: "rgba(62, 99, 176, 0.24)",
  },
} as const;

const colors = {
  brand: {
    primary: palette.primary[900],
    secondary: palette.secondary[500],
    accent: palette.accent[400],
    success: palette.success[500],
    warning: palette.warning[500],
    danger: palette.danger[500],
  },
  palette,
  semantic: semanticColors,
  transparent: "transparent",
  current: "currentColor",
  inherit: "inherit",
} as const;

// ---------------------------------------------------------------------------
// Spacing — 4px base grid (Apple / Stripe rhythm)
// ---------------------------------------------------------------------------

const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// ---------------------------------------------------------------------------
// Border radius — restrained curves (Linear / Apple)
// ---------------------------------------------------------------------------

const borderRadius = {
  none: "0",
  xs: "0.125rem",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  "4xl": "2rem",
  full: "9999px",
} as const;

// ---------------------------------------------------------------------------
// Shadows — soft elevation with brand-tinted depth
// ---------------------------------------------------------------------------

const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgba(11, 16, 32, 0.04)",
  sm: "0 1px 3px 0 rgba(11, 16, 32, 0.06), 0 1px 2px -1px rgba(11, 16, 32, 0.04)",
  md: "0 4px 6px -1px rgba(11, 16, 32, 0.07), 0 2px 4px -2px rgba(11, 16, 32, 0.05)",
  lg: "0 10px 15px -3px rgba(11, 16, 32, 0.08), 0 4px 6px -4px rgba(11, 16, 32, 0.04)",
  xl: "0 20px 25px -5px rgba(11, 16, 32, 0.08), 0 8px 10px -6px rgba(11, 16, 32, 0.04)",
  "2xl": "0 25px 50px -12px rgba(11, 16, 32, 0.18)",
  inner: "inset 0 2px 4px 0 rgba(11, 16, 32, 0.04)",
  focus: "0 0 0 3px rgba(93, 133, 209, 0.35)",
  focusRing: "0 0 0 2px #FFFFFF, 0 0 0 4px rgba(62, 99, 176, 0.5)",
  glow: {
    accent: "0 0 24px rgba(93, 133, 209, 0.25)",
    secondary: "0 0 24px rgba(62, 99, 176, 0.25)",
    success: "0 0 24px rgba(93, 133, 209, 0.25)",
    danger: "0 0 24px rgba(239, 68, 68, 0.25)",
  },
} as const;

// ---------------------------------------------------------------------------
// Transitions — subtle motion (Framer Motion–friendly presets)
// ---------------------------------------------------------------------------

const transitions = {
  duration: {
    instant: "0ms",
    fast: "100ms",
    base: "150ms",
    moderate: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
  easing: {
    linear: "linear",
    ease: "ease",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
  property: {
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    transform: "transform",
    shadow: "box-shadow",
    all: "all",
  },
  preset: {
    default: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    colors: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    shadow: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    layout: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// ---------------------------------------------------------------------------
// Typography — Apple / Linear scale (mobile-first)
// ---------------------------------------------------------------------------

const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)",
    mono: "var(--font-geist-mono, ui-monospace, monospace)",
    heading: "var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  fontSize: {
    display: { base: "2.25rem", sm: "3rem", lg: "3.75rem" },
    heading: { base: "1.5rem", sm: "1.875rem", lg: "2.25rem" },
    subheading: { base: "1.125rem", sm: "1.25rem" },
    body: { base: "1rem", sm: "0.875rem", lg: "1.125rem" },
    caption: { base: "0.875rem", sm: "0.75rem" },
  },
  lineHeight: {
    display: "1.08",
    heading: "1.2",
    subheading: "1.35",
    body: "1.625",
    caption: "1.5",
  },
  letterSpacing: {
    display: "-0.025em",
    heading: "-0.02em",
    subheading: "-0.01em",
    body: "0",
    caption: "0.01em",
  },
} as const;

// ---------------------------------------------------------------------------
// Z-index — predictable stacking order
// ---------------------------------------------------------------------------

const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
  max: 9999,
} as const;

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const designTokens = {
  brand,
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
  typography,
  zIndex,
} as const;

export type DesignTokens = typeof designTokens;
export type Brand = typeof brand;
export type Colors = typeof colors;
export type ColorPalette = typeof palette;
export type SemanticColors = typeof semanticColors;
export type ColorMode = keyof SemanticColors;
export type SemanticColorToken = keyof SemanticColors["light"];
export type Spacing = typeof spacing;
export type SpacingToken = keyof Spacing;
export type BorderRadius = typeof borderRadius;
export type BorderRadiusToken = keyof BorderRadius;
export type Shadows = typeof shadows;
export type ShadowToken = keyof Omit<Shadows, "glow">;
export type ShadowGlowToken = keyof Shadows["glow"];
export type Transitions = typeof transitions;
export type TransitionDuration = keyof Transitions["duration"];
export type TransitionEasing = keyof Transitions["easing"];
export type TransitionPreset = keyof Transitions["preset"];
export type Typography = typeof typography;
export type TypographyRole = keyof Typography["fontSize"];
export type TypographyTone =
  | "default"
  | "muted"
  | "subtle"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "inherit";
export type ZIndex = typeof zIndex;
export type ZIndexToken = keyof ZIndex;

export {
  brand,
  colors,
  spacing,
  borderRadius,
  shadows,
  transitions,
  typography,
  zIndex,
  palette,
  semanticColors,
};

export default designTokens;

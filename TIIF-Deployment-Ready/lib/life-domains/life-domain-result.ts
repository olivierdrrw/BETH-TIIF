export interface LifeDomainResult {
  domain: string;

  score: number;

  trend:
    | "improving"
    | "stable"
    | "declining";
}
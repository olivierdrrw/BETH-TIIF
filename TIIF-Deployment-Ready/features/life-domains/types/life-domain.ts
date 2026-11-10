export interface LifeDomains {
  mental: number;
  emotional: number;
  identity: number;
  relationships: number;
  education: number;
  career: number;
  purpose: number;
  physical: number;
}

/** Shared result alias used by scoring, storage, and insight services. */
export type LifeDomainResults = LifeDomains;
export type LifeDomainScores = LifeDomains;

export interface LifeDomainQuestion {
  id: string;
  domain: keyof LifeDomains;
  question: string;
}

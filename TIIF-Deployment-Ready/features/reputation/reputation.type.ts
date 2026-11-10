export interface Reputation {

  score: number;

  level:
    | "new"
    | "contributor"
    | "mentor"
    | "leader";
}
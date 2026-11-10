export interface Avatar {

  id: string;

  userId: string;

  name: string;

  level: number;

  mood:
    | "happy"
    | "calm"
    | "focused"
    | "stressed";

  evolutionStage: number;
}
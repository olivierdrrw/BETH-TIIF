export interface HumanNode {
  id: string;

  type:
    | "user"
    | "mentor"
    | "parent"
    | "friend"
    | "therapist"
    | "teacher";

  name: string;
}export interface HumanConnection {
  id: string;

  source: string;

  target: string;

  relationship:
    | "support"
    | "guidance"
    | "care"
    | "family";
}
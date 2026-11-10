export interface CommunityGroup {

  id: string;

  name: string;

  description: string;

  category:
    | "growth"
    | "wellbeing"
    | "purpose"
    | "students"
    | "professionals";

  memberCount: number;

  createdAt: string;
}
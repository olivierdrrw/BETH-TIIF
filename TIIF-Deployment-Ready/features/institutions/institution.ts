export interface Institution {

  id: string;

  name: string;

  type:
    | "school"
    | "ngo"
    | "therapy"
    | "company";

  memberCount: number;
}
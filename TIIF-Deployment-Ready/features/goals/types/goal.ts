export interface Goal {

 id:string;

 userId:string;

 title:string;

 description:string;

 category:
  | "health"
  | "career"
  | "finance"
  | "relationship"
  | "spirituality"
  | "growth";

 targetDate:string;

 progress:number;

 status:
  | "active"
  | "completed"
  | "paused";

 createdAt:string;

}
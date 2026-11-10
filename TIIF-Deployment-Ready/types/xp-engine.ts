export function awardXP(
 action:string
){

 switch(action){

  case "goal_completed":
   return 50;

  case "journal_created":
   return 10;

  case "assessment_completed":
   return 100;

  case "meditation_completed":
   return 20;

  default:
   return 0;

 }

}
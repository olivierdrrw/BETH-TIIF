export interface HumanTwin {

 id:string;

 userId:string;

 version:string;

 identityScore:number;

 growthScore:number;

 wellbeingScore:number;

 impactScore:number;

 purposeScore:number;

 relationshipScore:number;

 resilienceScore:number;

 currentLevel:number;

 currentXP:number;

 avatarLevel:string;

 strengths:string[];

 weaknesses:string[];

 opportunities:string[];

 risks:string[];

 primaryPurpose:string;

 currentStage:string;

 futureVision:string;

 nextMilestone:string;

 generatedAt:string;

 updatedAt:string;

}
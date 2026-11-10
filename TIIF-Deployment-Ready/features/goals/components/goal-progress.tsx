export function updateProgress(

 current:number,

 increase:number

){

 return Math.min(

 100,

 current + increase

 );

}
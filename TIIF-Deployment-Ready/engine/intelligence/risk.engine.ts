export class RiskEngine{

static calculateRisk(

burnout:number,

stress:number,

sleep:number

){

return Math.round(

(burnout+stress+sleep)/3

);

}

}
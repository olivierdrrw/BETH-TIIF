export class AnalyticsEngine{

static trend(

history:number[]

){

const latest=history.at(-1) ??0;

const previous=history.at(-2) ??0;

return latest-previous;

}

}
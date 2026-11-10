export class NotificationEngine{

static shouldNotify(

previous:number,

current:number

){

return Math.abs(current-previous)>=5;

}

}
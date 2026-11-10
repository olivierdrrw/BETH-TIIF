export interface IHumanTwinRepository{

subscribe(

uid:string,

callback:(data:any)=>void

):()=>void;

save(

uid:string,

data:any

):Promise<void>;

}
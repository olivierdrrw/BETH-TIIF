export interface AudioTrack{

 id:string;

 title:string;

 category:
 | "meditation"
 | "focus"
 | "sleep"
 | "healing";

 audioUrl:string;

 duration:number;

}
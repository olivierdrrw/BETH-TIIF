import {

 Room,

} from "livekit-client";

export async function connectRoom(

 token:string,

 url:string

){

 const room=
 new Room();

 await room.connect(

  url,

  token

 );

 return room;

}
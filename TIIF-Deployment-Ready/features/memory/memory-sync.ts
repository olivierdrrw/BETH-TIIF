import {
 MemoryRepository
}
from "@/features/memory/repositories/memory-repository";

export async function saveMemory(

 type:string,

 content:string,

 userId:string

){

 await MemoryRepository.save({

  type,

  content,

  userId,

  createdAt:
  new Date()
  .toISOString(),

 });

}
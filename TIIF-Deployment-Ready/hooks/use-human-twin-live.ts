"use client";

import { useEffect } from "react";

import { HumanTwinService } from "../services/human-twin.service";

import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export function useHumanTwinLive(uid:string){

const setTwin=
useHumanTwinStore(
s=>s.setTwin
);

useEffect(()=>{

const unsub=

HumanTwinService.subscribe(

uid,

setTwin

);

return unsub;

},[uid]);

}
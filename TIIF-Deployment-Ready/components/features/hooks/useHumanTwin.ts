"use client";

import { useMemo } from "react";

import { HUMAN_TWIN_DATA } from "@/components/features/human-twin/constants";

export function useHumanTwin(){

    return useMemo(()=>{

        return HUMAN_TWIN_DATA;

    },[]);

}
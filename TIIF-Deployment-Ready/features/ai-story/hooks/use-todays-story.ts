"use client";

import { useEffect } from "react";

import { StoryEngine } from "../engine/story.engine";

import { useStoryStore } from "../store/use-story-store";

import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export function useTodaysStory(){

const twin=

useHumanTwinStore();

const setStory=

useStoryStore(

s=>s.setStory

);

useEffect(()=>{

setStory(

StoryEngine.generate(twin)

);

},[

twin.identity,

twin.growth,

twin.resilience,

twin.emotionalState

]);

}
"use client";

import { create } from "zustand";

import { TodayStory } from "../types/story";

interface StoryState{

story:TodayStory | null;

setStory:(story:TodayStory)=>void;

}

export const useStoryStore=

create<StoryState>((set)=>({

story:null,

setStory:(story)=>

set({

story

})

}));
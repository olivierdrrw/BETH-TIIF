"use client";

import DashboardCard from "@/components/ui/dashboard-card";

import { Sparkles } from "lucide-react";

import { useTodaysStory } from "../hooks/use-todays-story";

import { useStoryStore } from "../store/use-story-store";

export default function TodaysStory(){

useTodaysStory();

const story=

useStoryStore(

s=>s.story

);

if(!story)return null;

return(

<DashboardCard className="relative overflow-hidden p-8">

<div className="absolute inset-0 bg-[radial-gradient(circle,#5D85D108,transparent_70%)]"/>

<div className="relative z-10">

<div className="flex items-center gap-3">

<Sparkles className="h-5 w-5 text-navy-400"/>

<p className="uppercase tracking-[0.35em] text-xs text-navy-400">

Today's Story™

</p>

</div>

<h2 className="mt-6 text-3xl font-bold">

{story.title}

</h2>

<p className="mt-6 leading-8 text-slate-300">

{story.message}

</p>

<div className="mt-8 rounded-2xl border border-navy-500/20 bg-navy-500/5 p-5">

<p className="text-navy-300">

{story.recommendation}

</p>

</div>

</div>

</DashboardCard>

);

}
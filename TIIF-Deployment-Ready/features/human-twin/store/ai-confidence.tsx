"use client";

import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export default function AIConfidence(){

const confidence=
useHumanTwinStore(
s=>s.aiConfidence
);

return(

<div className="
rounded-3xl
border
border-navy-500/20
bg-navy-500/5
p-6
">

<div className="flex justify-between">

<span>

AI Confidence

</span>

<strong>

{confidence}%

</strong>

</div>

<div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">

<div

className="
h-full
rounded-full
bg-gradient-to-r
from-navy-400
to-navy-500
transition-all
duration-700
"

style={{

width:`${confidence}%`

}}

/>

</div>

</div>

);

}
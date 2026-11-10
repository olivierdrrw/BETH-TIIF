import { HumanTwinState } from "@/features/human-twin/store/use-human-twin-store";

import { TodayStory } from "../types/story";

export class StoryEngine {

static generate(

twin:HumanTwinState

):TodayStory{

if(twin.identity>=90){

return{

title:"Identity Growth",

message:
"Your Human Twin shows exceptional emotional consistency today. Your identity alignment continues to strengthen.",

recommendation:
"Continue today's routine and complete your journal.",

mood:"Calm",

progress:twin.growth

};

}

return{

title:"Small Progress",

message:
"Today's journey is an opportunity to strengthen resilience and purpose.",

recommendation:
"Practice reflection and complete today's wellbeing check-in.",

mood:"Focused",

progress:twin.growth

};

}

}
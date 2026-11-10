"use client";

import {
 useOnboardingStore
}
from "@/app/onboarding/onboarding-store";

export function GoalsStep(){

 const { next } =
 useOnboardingStore();

 return(

  <div>

   <h1>
    Your Top Goals
   </h1>

   <textarea />

   <button
    onClick={next}
   >
    Generate Human Twin
   </button>

  </div>

 );

}
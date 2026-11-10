"use client";

import { motion } from "framer-motion";

export function AIThinking() {
  return (
    <div className="flex items-center gap-2">

      <span className="text-slate-400">
        Thinking
      </span>

      {[0,1,2].map((i)=>(
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-navy-400"
          animate={{
            y:[0,-5,0],
            opacity:[0.4,1,0.4],
          }}
          transition={{
            duration:0.8,
            repeat:Infinity,
            delay:i*0.15,
          }}
        />
      ))}

    </div>
  );
}
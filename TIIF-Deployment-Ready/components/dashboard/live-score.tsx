"use client";

import CountUp from "react-countup";

interface Props {
  value?: number;
}

export function LiveScore({
  value = 0,
}: Props) {
  return (
    <CountUp
      end={value}
      duration={2}
      suffix="%"
    />
  );
}
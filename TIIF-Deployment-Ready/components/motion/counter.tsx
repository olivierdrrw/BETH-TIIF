"use client";

import CountUp from "react-countup";

interface Props {
  end: number;
  suffix?: string;
}

export function Counter({
  end,
  suffix,
}: Props) {
  return (
    <CountUp
      end={end}
      duration={2.5}
      separator=","
      suffix={suffix}
    />
  );
}

export default Counter;
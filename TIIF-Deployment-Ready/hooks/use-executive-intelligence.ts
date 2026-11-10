"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getDashboardIntelligence,
} from "@/services/dashboard/get-dashboard-intelligence";

export function
useExecutiveIntelligence() {
  return useQuery({
    queryKey: [
      "executive-intelligence",
    ],
    queryFn:
      getDashboardIntelligence,
  });
}
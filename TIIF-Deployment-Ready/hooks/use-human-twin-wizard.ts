"use client";

import { useState } from "react";

export function useHumanTwinWizard() {

  const [currentStep,
    setCurrentStep] =
    useState(0);

  const steps = [
    "Analyzing Trauma Patterns",
    "Mapping Identity",
    "Evaluating Life Domains",
    "Discovering Purpose",
    "Generating Insights",
    "Creating Human Twin",
  ];

  function next() {
    setCurrentStep(
      (prev) => prev + 1
    );
  }

  return {
    currentStep,
    steps,
    next,
  };
}
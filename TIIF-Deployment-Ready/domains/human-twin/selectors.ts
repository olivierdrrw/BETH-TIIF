import {
  useHumanTwinStore,
} from "./store";

export function
useIdentityScore() {
  return useHumanTwinStore(
    (state) =>
      state.twin
        ?.identityScore ?? 0
  );
}

export function
useGrowthScore() {
  return useHumanTwinStore(
    (state) =>
      state.twin
        ?.growthScore ?? 0
  );
}
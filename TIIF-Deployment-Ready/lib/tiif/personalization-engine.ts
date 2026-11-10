export function
buildPersonalization(
  emotion:
    string,
  wellnessScore:
    number
) {
  return {
    tone:
      wellnessScore >= 70
        ? "encouraging"
        : "supportive",

    focus:
      emotion,
  };
}
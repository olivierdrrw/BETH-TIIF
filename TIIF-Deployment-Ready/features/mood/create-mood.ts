import {
  MoodRepository,
}
from "@/features/mood/mood-repository";

export async function createMood(
  mood: any
) {

  return MoodRepository.create(
    mood
  );
}
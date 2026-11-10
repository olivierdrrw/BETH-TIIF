import { getUserProfile, updateUserProfile } from "@/repositories/user-repository";
import { awardXP } from "@/features/avatar/avatar-xp-engine";

/**
 * Awards XP to a user and persists the new total. Wraps the pure
 * awardXP() calculation with the actual Firestore read/write.
 */
export async function awardXPToUser(uid: string, amount: number): Promise<number> {
  const profile = await getUserProfile(uid);
  const currentXP = profile?.xp ?? 0;
  const newXP = awardXP(currentXP, amount);

  await updateUserProfile(uid, { xp: newXP });

  return newXP;
}

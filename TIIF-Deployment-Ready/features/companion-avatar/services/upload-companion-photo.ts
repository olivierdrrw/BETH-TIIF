import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/lib/firebase/config";

const storage = getStorage(app);

// Separate storage path from the user's profile avatar (features/avatar) —
// a Companion's look and the person's own profile photo are different things.
export async function uploadCompanionPhoto(userId: string, file: File): Promise<string> {
  const photoRef = ref(storage, `companion-avatars/${userId}`);
  await uploadBytes(photoRef, file);
  return getDownloadURL(photoRef);
}

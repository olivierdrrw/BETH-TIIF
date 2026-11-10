import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { app }
from "@/lib/firebase/config";

const storage =
  getStorage(app);

export async function uploadAvatar(
  userId: string,
  file: File
) {
  const avatarRef =
    ref(
      storage,
      `avatars/${userId}`
    );

  await uploadBytes(
    avatarRef,
    file
  );

  return getDownloadURL(
    avatarRef
  );
}
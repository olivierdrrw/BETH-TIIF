import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytesResumable,
  type UploadTaskSnapshot,
} from "firebase/storage";

import { storage } from "@/lib/firebase/storage";
import type { FileItem } from "../types/file-item";

function userFolder(userId: string) {
  return `users/${userId}/files`;
}

export function uploadFile(
  userId: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<FileItem> {
  return new Promise((resolve, reject) => {
    const path = `${userFolder(userId)}/${Date.now()}_${file.name}`;
    const fileRef = ref(storage, path);
    const task = uploadBytesResumable(fileRef, file);

    task.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(Math.round(percent));
      },
      reject,
      async () => {
        const url = await getDownloadURL(fileRef);
        const metadata = await getMetadata(fileRef);
        resolve({
          name: file.name,
          fullPath: fileRef.fullPath,
          url,
          size: metadata.size,
          contentType: metadata.contentType ?? "application/octet-stream",
          createdAt: metadata.timeCreated,
        });
      }
    );
  });
}

export async function listFiles(userId: string): Promise<FileItem[]> {
  const folderRef = ref(storage, userFolder(userId));
  const result = await listAll(folderRef);

  const files = await Promise.all(
    result.items.map(async (itemRef) => {
      const [url, metadata] = await Promise.all([
        getDownloadURL(itemRef),
        getMetadata(itemRef),
      ]);

      return {
        name: metadata.name.replace(/^\d+_/, ""),
        fullPath: itemRef.fullPath,
        url,
        size: metadata.size,
        contentType: metadata.contentType ?? "application/octet-stream",
        createdAt: metadata.timeCreated,
      } satisfies FileItem;
    })
  );

  return files.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function deleteFile(fullPath: string): Promise<void> {
  await deleteObject(ref(storage, fullPath));
}

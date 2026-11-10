"use client";

import { useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  File as FileIcon,
  Trash2,
  Download,
  Loader2,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { uploadFile, listFiles, deleteFile } from "@/features/files/repositories/file-repository";
import type { FileItem } from "@/features/files/types/file-item";

const MAX_SIZE = 25 * 1024 * 1024; // 25MB

function iconFor(contentType: string) {
  if (contentType.startsWith("image/")) return ImageIcon;
  if (contentType.startsWith("audio/")) return Music;
  if (contentType.startsWith("video/")) return Video;
  if (contentType.includes("pdf") || contentType.includes("text")) return FileText;
  return FileIcon;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FilesPage() {
  const user = useAuthStore((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  async function load() {
    if (!user?.uid) return;
    setIsLoading(true);
    setFiles(await listFiles(user.uid));
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  async function handleUpload(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file || !user?.uid) return;

    if (file.size > MAX_SIZE) {
      setError("Files must be smaller than 25MB.");
      return;
    }

    setError(null);
    setUploadProgress(0);

    try {
      await uploadFile(user.uid, file, setUploadProgress);
      await load();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploadProgress(null);
    }
  }

  async function handleDelete(file: FileItem) {
    setFiles((prev) => prev.filter((f) => f.fullPath !== file.fullPath));
    await deleteFile(file.fullPath);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Files</h1>
        <p className="mt-1 text-slate-400">Your private, secure document storage.</p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleUpload(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition ${
          isDragging ? "border-navy-400 bg-navy-500/5" : "border-white/10 hover:border-white/20"
        }`}
      >
        {uploadProgress !== null ? (
          <>
            <Loader2 className="animate-spin text-navy-400" />
            <p className="mt-3 text-sm text-slate-400">Uploading... {uploadProgress}%</p>
          </>
        ) : (
          <>
            <Upload size={24} className="text-slate-500" />
            <p className="mt-3 text-sm text-slate-300">Drop a file here, or click to browse</p>
            <p className="mt-1 text-xs text-slate-500">Up to 25MB</p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {error && <p className="text-sm text-rose-300">{error}</p>}

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : files.length === 0 ? (
        <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
          No files yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {files.map((file) => {
            const Icon = iconFor(file.contentType);
            return (
              <div
                key={file.fullPath}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                {file.contentType.startsWith("image/") ? (
                  <img src={file.url} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-500/10">
                    <Icon size={18} className="text-navy-300" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">{file.name}</p>
                  <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
                </div>

                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                >
                  <Download size={15} />
                </a>
                <button
                  onClick={() => handleDelete(file)}
                  className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

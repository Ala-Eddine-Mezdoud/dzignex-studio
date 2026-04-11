export type ViewMode = "grid" | "list"

export interface MediaFile {
  type: "image" | "video" | "file"
  name: string
  path: string
  key: string
  size: number
  lastModified: string
  url: string
}

export interface MediaFolder {
  type: "folder"
  name: string
  path: string
  key: string
}

export type MediaItem = MediaFile | MediaFolder

export interface UploadingFile {
  id: string
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  error?: string
}

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
] as const

export const ALLOWED_FILE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "mp4",
  "webm",
  "mov",
  "qt",
  "pdf",
  "docx",
  "pptx",
  "xlsx",
  "mp3",
  "wav",
  "ogg",
] as const

export const MAX_FILE_SIZE = 100 * 1024 * 1024

export function normalizeMediaPrefix(prefix?: string) {
  if (!prefix) {
    return ""
  }

  const normalized = prefix.replace(/^\/+/, "").replace(/\/+$/, "")
  return normalized ? `${normalized}/` : ""
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB", "TB"]
  let value = bytes / 1024
  let index = 0

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024
    index += 1
  }

  return `${value.toFixed(1)} ${units[index]}`
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}

export function getFileType(fileName: string): MediaFile["type"] {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? ""

  if (/^(jpg|jpeg|png|gif|webp|svg)$/.test(extension)) {
    return "image"
  }

  if (/^(mp4|webm|mov|quicktime|qt)$/.test(extension)) {
    return "video"
  }

  return "file"
}

export function getPreviewType(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? ""

  if (/^(jpg|jpeg|png|gif|webp|svg)$/.test(extension)) {
    return "image"
  }

  if (/^(mp4|webm|mov|quicktime|qt)$/.test(extension)) {
    return "video"
  }

  if (/^(mp3|wav|ogg)$/.test(extension)) {
    return "audio"
  }

  if (extension === "pdf") {
    return "pdf"
  }

  return "other"
}

export function hasAllowedFileType(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? ""
  return (
    ALLOWED_FILE_TYPES.includes(file.type as typeof ALLOWED_FILE_TYPES[number]) ||
    ALLOWED_FILE_EXTENSIONS.includes(extension as typeof ALLOWED_FILE_EXTENSIONS[number])
  )
}

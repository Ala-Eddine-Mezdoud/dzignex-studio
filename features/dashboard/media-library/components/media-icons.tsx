import { File, FileText, Folder, ImageIcon, Music, Video } from "lucide-react"

export type MediaIconType = "folder" | "image" | "video" | "audio" | "document" | "other"

export function getMediaIcon(type: MediaIconType) {
  switch (type) {
    case "folder":
      return Folder
    case "image":
      return ImageIcon
    case "video":
      return Video
    case "audio":
      return Music
    case "document":
      return FileText
    default:
      return File
  }
}

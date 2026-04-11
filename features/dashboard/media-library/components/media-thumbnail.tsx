import { Folder } from "lucide-react"

import { getMediaIcon, type MediaIconType } from "./media-icons"
import { MediaItem } from "../types"

interface MediaThumbnailProps {
  item: MediaItem
}

function resolveIconType(item: MediaItem): MediaIconType {
  if (item.type === "folder") {
    return "folder"
  }

  const extension = item.name.split(".").pop()?.toLowerCase()

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension ?? "")) {
    return "image"
  }

  if (["mp4", "webm", "mov", "qt", "quicktime"].includes(extension ?? "")) {
    return "video"
  }

  if (["mp3", "wav", "ogg"].includes(extension ?? "")) {
    return "audio"
  }

  if (["pdf", "docx", "pptx", "xlsx"].includes(extension ?? "")) {
    return "document"
  }

  return "other"
}

export function MediaThumbnail({ item }: MediaThumbnailProps) {
  if (item.type === "folder") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-amber-500/10 text-amber-600">
        <Folder className="size-8" />
      </div>
    )
  }

  if (item.type === "image") {
    return (
      <img
        src={item.url}
        alt={item.name}
        className="h-40 w-full rounded-[1.5rem] object-cover"
        loading="lazy"
      />
    )
  }

  if (item.type === "video") {
    const Icon = getMediaIcon("video")
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-[1.5rem] bg-violet-500/10 text-violet-600">
        <Icon className="size-8" />
      </div>
    )
  }

  const iconType: MediaIconType = resolveIconType(item)
  const Icon = getMediaIcon(iconType)

  return (
    <div className="flex h-40 w-full items-center justify-center rounded-[1.5rem] bg-muted/60 text-muted-foreground">
      <Icon className="size-8" />
    </div>
  )
}

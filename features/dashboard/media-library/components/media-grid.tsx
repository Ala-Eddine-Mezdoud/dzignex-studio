import { MoreVertical, Download, Share2 } from "lucide-react"
import { cn } from "../../../../lib/utils"
import { MediaItem, MediaFolder, formatFileSize } from "../types"
import { MediaThumbnail } from "./media-thumbnail"

interface MediaGridProps {
  items: MediaItem[]
  selectedItems: Set<string>
  onSelect: (key: string) => void
  onPreview: (item: MediaItem) => void
  onDelete: (item: MediaItem[]) => void
  onNavigate: (folder: MediaFolder) => void
}

export function MediaGrid({ items, selectedItems, onSelect, onPreview, onDelete, onNavigate }: MediaGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.key}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-background transition-all hover:border-border hover:shadow-sm",
            selectedItems.has(item.key) && "border-primary/50 bg-primary/5"
          )}
        >
          <div className="relative aspect-square bg-muted/30">
            <button
              type="button"
              onClick={() => onSelect(item.key)}
              className={cn(
                "absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded border transition-all",
                selectedItems.has(item.key)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background/80 opacity-0 backdrop-blur-sm group-hover:opacity-100"
              )}
              aria-label={`Select ${item.name}`}
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {selectedItems.has(item.key) && <polyline points="20 6 9 17 4 12" />}
              </svg>
            </button>

            <button
              type="button"
              className="flex h-full w-full items-center justify-center transition-opacity group-hover:opacity-90"
              onClick={() => (item.type === "folder" ? onNavigate(item) : onPreview(item))}
            >
              <MediaThumbnail item={item} />
            </button>

            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onPreview(item)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm text-foreground hover:bg-background"
              >
                <MoreVertical className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col px-3 py-2">
            <button
              type="button"
              onClick={() => (item.type === "folder" ? onNavigate(item) : onPreview(item))}
              className="truncate text-sm font-medium text-foreground transition-colors hover:text-primary text-left"
              title={item.name}
            >
              {item.name}
            </button>
            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
              <span className="truncate">
                {item.type === "folder" ? "Folder" : formatFileSize(item.size)}
              </span>
              <span className="shrink-0">
                {item.type === "folder" ? "—" : new Date(item.lastModified).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

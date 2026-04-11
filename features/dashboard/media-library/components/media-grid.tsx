import { Trash2 } from "lucide-react"

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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.key} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:border-primary/80">
          <div className="relative p-4">
            <button
              type="button"
              onClick={() => onSelect(item.key)}
              className={`absolute left-4 top-4 rounded-full border border-input bg-background p-2 shadow-sm transition ${selectedItems.has(item.key) ? "border-primary bg-primary/10" : "hover:border-primary/70"}`}
              aria-label={`Select ${item.name}`}
            >
              <span className={`block h-3.5 w-3.5 rounded-full ${selectedItems.has(item.key) ? "bg-primary" : "bg-muted"}`} />
            </button>

            <button
              type="button"
              className="flex h-40 w-full items-center justify-center rounded-[1.5rem] bg-muted/40 transition hover:bg-muted/60"
              onClick={() => (item.type === "folder" ? onNavigate(item) : onPreview(item))}
            >
              <MediaThumbnail item={item} />
            </button>
          </div>

          <div className="space-y-3 border-t border-border px-4 py-4">
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => (item.type === "folder" ? onNavigate(item) : onPreview(item))}
                className="text-left text-sm font-semibold text-foreground transition hover:text-primary"
              >
                {item.name}
              </button>
              {item.type !== "folder" ? (
                <p className="text-sm text-muted-foreground">{formatFileSize(item.size)}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Folder</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>{item.type === "folder" ? "Folder" : item.lastModified.split("T")[0]}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPreview(item)}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-foreground transition hover:bg-accent"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => onDelete([item])}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { MoreVertical } from "lucide-react"
import { cn } from "../../../../lib/utils"
import { MediaItem, MediaFolder, formatFileSize } from "../types"
import { MediaThumbnail } from "./media-thumbnail"

interface MediaListProps {
  items: MediaItem[]
  selectedItems: Set<string>
  onSelect: (key: string) => void
  onPreview: (item: MediaItem) => void
  onDelete: (item: MediaItem[]) => void
  onNavigate: (folder: MediaFolder) => void
}

export function MediaList({ items, selectedItems, onSelect, onPreview, onDelete, onNavigate }: MediaListProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/50 bg-background">
      <div className="grid gap-0 border-b border-border/50 bg-muted/30 px-4 py-2.5 text-xs font-medium text-muted-foreground sm:grid-cols-[40px_minmax(0,2fr)_120px_140px_80px]">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary"
            disabled
          />
        </div>
        <div className="flex items-center gap-2">Name</div>
        <div className="hidden items-center justify-end sm:flex">Size</div>
        <div className="hidden items-center justify-end lg:flex">Modified</div>
        <div className="flex items-center justify-end" />
      </div>

      {items.map((item) => (
        <div
          key={item.key}
          className={cn(
            "grid gap-0 border-b border-border/50 px-4 py-2.5 text-sm transition-colors sm:grid-cols-[40px_minmax(0,2fr)_120px_140px_80px]",
            selectedItems.has(item.key) ? "bg-primary/5" : "hover:bg-muted/30"
          )}
        >
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => onSelect(item.key)}
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded border transition-all",
                selectedItems.has(item.key)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/50"
              )}
              aria-label={`Select ${item.name}`}
            >
              {selectedItems.has(item.key) && (
                <svg
                  className="h-2.5 w-2.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => (item.type === "folder" ? onNavigate(item) : onPreview(item))}
              className="flex shrink-0 items-center justify-center rounded bg-muted/50 p-1.5"
            >
              <div className="size-8">
                <MediaThumbnail item={item} />
              </div>
            </button>
            <button
              type="button"
              onClick={() => (item.type === "folder" ? onNavigate(item) : onPreview(item))}
              className="min-w-0 truncate text-left font-medium text-foreground transition-colors hover:text-primary"
              title={item.name}
            >
              {item.name}
            </button>
          </div>

          <div className="hidden items-center justify-end text-xs text-muted-foreground sm:flex">
            {item.type === "folder" ? "—" : formatFileSize(item.size)}
          </div>
          <div className="hidden items-center justify-end text-xs text-muted-foreground lg:flex">
            {item.type === "folder" ? "—" : new Date(item.lastModified).toLocaleDateString()}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => onDelete([item])}
              className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              title="Delete"
            >
              <MoreVertical className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

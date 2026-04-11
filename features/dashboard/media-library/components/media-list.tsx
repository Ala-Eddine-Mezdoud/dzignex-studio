import { MediaItem, MediaFolder } from "../types"
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
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="grid gap-0 border-b border-border px-4 py-3 text-sm font-semibold text-muted-foreground sm:grid-cols-[minmax(0,1fr)_140px_180px_120px]">
        <div className="flex items-center gap-3">File</div>
        <div className="hidden items-center justify-end gap-2 sm:flex">Size</div>
        <div className="hidden items-center justify-end gap-2 lg:flex">Modified</div>
        <div className="flex items-center justify-end gap-2">Actions</div>
      </div>

      {items.map((item) => (
        <div key={item.key} className="grid gap-0 border-b border-border px-4 py-4 text-sm sm:grid-cols-[minmax(0,1fr)_140px_180px_120px] hover:bg-muted/30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => onSelect(item.key)}
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${selectedItems.has(item.key) ? "border-primary bg-primary/10" : "border-input bg-background"}`}
              aria-label={`Select ${item.name}`}
            >
              {selectedItems.has(item.key) ? <span className="block h-2.5 w-2.5 rounded-full bg-primary" /> : null}
            </button>
            <button
              type="button"
              onClick={() => (item.type === "folder" ? onNavigate(item) : onPreview(item))}
              className="flex min-w-0 items-center gap-3 text-left"
            >
              <div className="rounded-2xl border border-border bg-muted/50 p-3">
                <MediaThumbnail item={item} />
              </div>
              <div className="min-w-0 overflow-hidden">
                <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                <p className="truncate text-xs text-muted-foreground">{item.type === "folder" ? "Folder" : "File"}</p>
              </div>
            </button>
          </div>

          <div className="hidden items-center justify-end text-sm text-muted-foreground sm:flex">
            {item.type === "folder" ? "—" : `${(item.size / 1024 / 1024).toFixed(1)} MB`}
          </div>
          <div className="hidden items-center justify-end text-sm text-muted-foreground lg:flex">{item.type === "folder" ? "—" : item.lastModified.split("T")[0]}</div>
          <div className="flex items-center justify-end gap-2">
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
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

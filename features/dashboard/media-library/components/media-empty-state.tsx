import { FilePlus, Search } from "lucide-react"
import { Button } from "../../components/ui/button"

interface MediaEmptyStateProps {
  searchQuery: string
  onClearSearch: () => void
  onUpload: () => void
}

export function MediaEmptyState({ searchQuery, onClearSearch, onUpload }: MediaEmptyStateProps) {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card/80 px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
        <FilePlus className="size-6" />
      </div>
      <div className="space-y-3 pt-6">
        <h2 className="text-lg font-semibold">No media found</h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          {searchQuery ? "No results match your search. Try a different query or clear search." : "Upload your first files or create a folder to organize content."}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 sm:justify-center">
          {searchQuery ? (
            <Button variant="outline" onClick={onClearSearch}>
              Clear search
            </Button>
          ) : null}
          <Button onClick={onUpload}>
            Upload media
          </Button>
        </div>
      </div>
    </div>
  )
}

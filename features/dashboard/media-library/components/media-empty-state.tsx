import { UploadCloud, SearchX } from "lucide-react"
import { Button } from "../../components/ui/button"

interface MediaEmptyStateProps {
  searchQuery: string
  onClearSearch: () => void
  onUpload: () => void
}

export function MediaEmptyState({ searchQuery, onClearSearch, onUpload }: MediaEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/30 text-muted-foreground">
        {searchQuery ? <SearchX className="size-10" /> : <UploadCloud className="size-10" />}
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-foreground">
          {searchQuery ? "No results found" : "No media files yet"}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {searchQuery
            ? "Try adjusting your search terms or browse the folders."
            : "Upload your first files or create folders to organize your media library."}
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          {searchQuery && (
            <Button variant="outline" onClick={onClearSearch}>
              Clear search
            </Button>
          )}
          <Button onClick={onUpload}>
            <UploadCloud className="mr-2 size-4" />
            Upload files
          </Button>
        </div>
      </div>
    </div>
  )
}

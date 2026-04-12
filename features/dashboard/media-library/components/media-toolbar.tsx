import { LayoutGrid, LayoutList, Search, Trash2, FolderPlus, UploadCloud, MoreHorizontal } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb"
import { ViewMode } from "../types"

interface BreadcrumbSegment {
  label: string
  path: string
}

interface MediaToolbarProps {
  breadcrumbs: BreadcrumbSegment[]
  viewMode: ViewMode
  searchQuery: string
  selectedCount: number
  isPending: boolean
  onSearchChange: (value: string) => void
  onViewModeChange: (mode: ViewMode) => void
  onNewFolder: () => void
  onUploadClick: () => void
  onDeleteSelected: () => void
  onSelectAll: () => void
  onNavigatePath: (path: string) => void
}

export function MediaToolbar({
  breadcrumbs,
  viewMode,
  searchQuery,
  selectedCount,
  isPending,
  onSearchChange,
  onViewModeChange,
  onNewFolder,
  onUploadClick,
  onDeleteSelected,
  onSelectAll,
  onNavigatePath,
}: MediaToolbarProps) {

  return (
    <div className="flex items-center gap-3 border-b border-border/50 bg-muted/30 px-6 py-3">
      <Breadcrumb aria-label="Breadcrumb" className="flex-1 text-sm">
        <BreadcrumbList>
          {breadcrumbs.map((segment, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <BreadcrumbItem key={segment.path + index}>
                {isLast ? (
                  <BreadcrumbPage className="text-foreground">{segment.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    onClick={(event) => {
                      event.preventDefault()
                      onSearchChange("")
                      onNavigatePath(segment.path)
                    }}
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {segment.label}
                  </BreadcrumbLink>
                )}
                {!isLast && <BreadcrumbSeparator className="text-muted-foreground" />}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            className="h-9 w-64 bg-background pl-10"
          />
        </div>

        <div className="flex items-center gap-0.5 rounded-lg border border-border/50 bg-background p-0.5">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onViewModeChange("grid")}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onViewModeChange("list")}
          >
            <LayoutList className="size-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-border/50" />

        <Button variant="ghost" size="sm" className="h-9 gap-2" onClick={onNewFolder}>
          <FolderPlus className="size-4" />
          <span className="hidden sm:inline">New Folder</span>
        </Button>

        <Button variant="ghost" size="sm" className="h-9 gap-2" onClick={onUploadClick}>
          <UploadCloud className="size-4" />
          <span className="hidden sm:inline">Upload</span>
        </Button>

        {selectedCount > 0 && (
          <>
            <div className="h-6 w-px bg-border/50" />
            <span className="text-xs text-muted-foreground">{selectedCount} selected</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onDeleteSelected}
              disabled={isPending}
            >
              <Trash2 className="size-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

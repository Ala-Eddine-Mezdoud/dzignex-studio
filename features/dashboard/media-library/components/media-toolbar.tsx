import { FilePlus, LayoutGrid, LayoutList, Search, Trash2, FolderPlus, UploadCloud } from "lucide-react"
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
    <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
      <div className="grid gap-4">
        <div className="rounded-2xl border bg-secondary/5 p-4">
          <Breadcrumb aria-label="Breadcrumb" className="text-sm">
            <BreadcrumbList>
              {breadcrumbs.map((segment, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <BreadcrumbItem key={segment.path + index}>
                    {isLast ? (
                      <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        onClick={(event) => {
                          event.preventDefault()
                          onSearchChange("")
                          onNavigatePath(segment.path)
                        }}
                        href="#"
                      >
                        {segment.label}
                      </BreadcrumbLink>
                    )}
                    {!isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search media"
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "outline"}
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "outline"}
              onClick={() => onViewModeChange("list")}
            >
              <LayoutList className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[auto_auto_auto]">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onSelectAll}>
            <FilePlus className="size-4" />
            Select all
          </Button>
          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-foreground">{selectedCount}</span>
        </div>

        <Button variant="outline" size="sm" onClick={onUploadClick}>
          <UploadCloud className="size-4" />
          Upload
        </Button>

        <Button variant="default" size="sm" onClick={onNewFolder}>
          <FolderPlus className="size-4" />
          New folder
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={onDeleteSelected}
          disabled={selectedCount === 0 || isPending}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>

    </div>
  )
}

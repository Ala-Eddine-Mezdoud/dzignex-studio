"use client"

import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { toast } from "sonner"

import { listMedia, getUploadPresignedUrl, createFolder, deleteMultipleMedia, deleteMedia } from "../actions"
import { hasAllowedFileType, MAX_FILE_SIZE, MediaFile, MediaFolder, MediaItem, UploadingFile, ViewMode } from "../types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { MediaToolbar } from "./media-toolbar"
import { MediaGrid } from "./media-grid"
import { MediaList } from "./media-list"
import { MediaEmptyState } from "./media-empty-state"
import { MediaSkeleton } from "./media-skeleton"
import { DropZoneOverlay } from "./drop-zone-overlay"
import { CreateFolderDialog } from "./create-folder-dialog"
import { UploadDialog } from "./upload-dialog"
import { DeleteDialog } from "./delete-dialog"
import { PreviewDialog } from "./preview-dialog"

interface MediaLibraryClientProps {
  initialItems: MediaItem[]
  initialPath?: string
}

export function MediaLibraryClient({ initialItems, initialPath = "" }: MediaLibraryClientProps) {
  const [items, setItems] = useState<MediaItem[]>(initialItems)
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [deleteTargets, setDeleteTargets] = useState<MediaItem[]>([])
  const [previewItem, setPreviewItem] = useState<MediaFile | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  useEffect(() => {
    if (uploadingFiles.length > 0) {
      setIsUploadDialogOpen(true)
    }
  }, [uploadingFiles.length])

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items
    return items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [items, searchQuery])

  const allVisibleSelected = useMemo(
    () => filteredItems.length > 0 && filteredItems.every((item) => selectedItems.has(item.key)),
    [filteredItems, selectedItems]
  )

  const loadMedia = useCallback(
    async (path?: string) => {
      startTransition(async () => {
        const response = await listMedia(path)

        if (!response.success || !response.data) {
          toast.error(response.error || "Unable to load media.")
          return
        }

        setItems([...response.data.folders, ...response.data.files])
        setCurrentPath(response.data.currentPath)
        setSelectedItems(new Set())
        setSearchQuery("")
      })
    },
    [startTransition]
  )

  const handleNavigate = useCallback(
    async (folder: MediaFolder) => {
      await loadMedia(folder.path)
    },
    [loadMedia]
  )

  const handleFolderCrate = useCallback(
    async (folderName: string) => {
      const response = await createFolder(folderName, currentPath)

      if (!response.success) {
        toast.error(response.error || "Could not create folder.")
        return
      }

      toast.success(`Folder created: ${folderName}`)
      setIsCreatingFolder(false)
      await loadMedia(currentPath)
    },
    [currentPath, loadMedia]
  )

  const updateUploadingFile = useCallback((id: string, updates: Partial<UploadingFile>) => {
    setUploadingFiles((current) =>
      current.map((upload) => (upload.id === id ? { ...upload, ...updates } : upload))
    )
  }, [])

  const simulateProgress = useCallback((id: string) => {
    const interval = window.setInterval(() => {
      setUploadingFiles((current) =>
        current.map((upload) => {
          if (upload.id !== id || upload.status !== "uploading") {
            return upload
          }

          const nextProgress = Math.min(upload.progress + 10, 90)
          return {
            ...upload,
            progress: nextProgress,
          }
        })
      )
    }, 200)

    return interval
  }, [])

  const handleUploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.isArray(files) ? files : Array.from(files)
      const queuedFiles: UploadingFile[] = fileArray.map((file) => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: "uploading",
      }))

      setUploadingFiles((current) => [...current, ...queuedFiles])

      for (const upload of queuedFiles) {
        if (!hasAllowedFileType(upload.file)) {
          updateUploadingFile(upload.id, {
            status: "error",
            progress: 100,
            error: "File type not supported.",
          })
          toast.error(`File not supported: ${upload.file.name}`)
          continue
        }

        if (upload.file.size > MAX_FILE_SIZE) {
          updateUploadingFile(upload.id, {
            status: "error",
            progress: 100,
            error: "File size exceeds 100MB.",
          })
          toast.error(`File too large: ${upload.file.name}`)
          continue
        }

        const presign = await getUploadPresignedUrl(`${currentPath}${upload.file.name}`, upload.file.type)

        if (!presign.success || !presign.data?.url) {
          updateUploadingFile(upload.id, {
            status: "error",
            progress: 100,
            error: presign.error || "Could not get upload URL.",
          })
          toast.error(`Upload failed: ${upload.file.name}`)
          continue
        }

        const interval = simulateProgress(upload.id)

        try {
          const response = await fetch(presign.data.url, {
            method: "PUT",
            mode: "cors",
            body: upload.file,
          })

          if (!response.ok) {
            throw new Error(`Upload request failed ${response.status}`)
          }

          window.clearInterval(interval)
          updateUploadingFile(upload.id, {
            status: "completed",
            progress: 100,
          })
          toast.success(`Uploaded ${upload.file.name}`)
        } catch (error) {
          window.clearInterval(interval)
          updateUploadingFile(upload.id, {
            status: "error",
            progress: 100,
            error: error instanceof Error ? error.message : "Upload failed.",
          })
          toast.error(`Upload failed: ${upload.file.name}`)
        }
      }

      await loadMedia(currentPath)
    },
    [currentPath, loadMedia, simulateProgress, updateUploadingFile]
  )

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragging(false)

      if (event.dataTransfer.files.length > 0) {
        await handleUploadFiles(event.dataTransfer.files)
      }
    },
    [handleUploadFiles]
  )

  const handleSelectAll = useCallback(() => {
    setSelectedItems((current) => {
      if (allVisibleSelected) {
        return new Set()
      }

      return new Set(filteredItems.map((item) => item.key))
    })
  }, [allVisibleSelected, filteredItems])

  const handleToggleSelect = useCallback((key: string) => {
    setSelectedItems((current) => {
      const next = new Set(current)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  const openDeleteDialog = useCallback((itemsToDelete: MediaItem[]) => {
    setDeleteTargets(itemsToDelete)
  }, [])

  const handleConfirmDelete = useCallback(
    async (itemsToDelete: MediaItem[]) => {
      const keys = itemsToDelete.map((item) => item.key)
      const response = await deleteMultipleMedia(keys)

      if (!response.success) {
        toast.error(response.error || "Unable to delete selected items.")
        return
      }

      toast.success(`Deleted ${itemsToDelete.length} item(s)`)
      setSelectedItems(new Set())
      setDeleteTargets([])
      await loadMedia(currentPath)
    },
    [currentPath, loadMedia]
  )

  const handlePreview = useCallback((item: MediaItem) => {
    if (item.type === "folder") {
      handleNavigate(item)
      return
    }

    setPreviewItem(item)
  }, [handleNavigate])

  const breadcrumbs = useMemo(() => {
    const segments = currentPath.replace(/\/+$/, "").split("/").filter(Boolean)
    return [
      {
        label: "Root",
        path: "",
      },
      ...segments.map((segment, index) => ({
        label: segment,
        path: `${segments.slice(0, index + 1).join("/")}/`,
      })),
    ]
  }, [currentPath])

  return (
    <div
      className="relative min-h-[calc(100vh-6rem)]"
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(event) => {
        event.preventDefault()
        setIsDragging(false)
      }}
      onDrop={handleDrop}
    >
      {isDragging && <DropZoneOverlay />}

      <div className="space-y-6 pb-10 pt-4">


        <Card className="overflow-hidden">
          <CardContent className="space-y-4 px-4 py-4 md:px-6 md:py-5">
            <MediaToolbar
              breadcrumbs={breadcrumbs}
              viewMode={viewMode}
              searchQuery={searchQuery}
              selectedCount={selectedItems.size}
              isPending={isPending}
              onSearchChange={(value: string) => setSearchQuery(value)}
              onViewModeChange={(mode: ViewMode) => setViewMode(mode)}
              onNewFolder={() => setIsCreatingFolder(true)}
              onUploadClick={() => document.getElementById("media-file-input")?.click()}
              onDeleteSelected={() => openDeleteDialog(items.filter((item) => selectedItems.has(item.key)))}
              onSelectAll={handleSelectAll}
              onNavigatePath={(path: string) => loadMedia(path)}
            />

            {isPending ? (
              <MediaSkeleton viewMode={viewMode} />
            ) : filteredItems.length === 0 ? (
              <MediaEmptyState
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
                onUpload={() => document.getElementById("media-file-input")?.click()}
              />
            ) : viewMode === "grid" ? (
              <MediaGrid
                items={filteredItems}
                selectedItems={selectedItems}
                onSelect={handleToggleSelect}
                onPreview={handlePreview}
                onDelete={openDeleteDialog}
                onNavigate={handleNavigate}
              />
            ) : (
              <MediaList
                items={filteredItems}
                selectedItems={selectedItems}
                onSelect={handleToggleSelect}
                onPreview={handlePreview}
                onDelete={openDeleteDialog}
                onNavigate={handleNavigate}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <CreateFolderDialog
        open={isCreatingFolder}
        onClose={() => setIsCreatingFolder(false)}
        onCreate={handleFolderCrate}
      />

      <UploadDialog
        open={isUploadDialogOpen}
        files={uploadingFiles}
        onClose={() => setIsUploadDialogOpen(false)}
      />

      <DeleteDialog
        open={deleteTargets.length > 0}
        items={deleteTargets}
        onClose={() => setDeleteTargets([])}
        onConfirm={() => handleConfirmDelete(deleteTargets)}
      />

      <PreviewDialog
        file={previewItem}
        onClose={() => setPreviewItem(null)}
        onDelete={(file: MediaFile) => {
          openDeleteDialog([file])
          setPreviewItem(null)
        }}
      />

      <input
        id="media-file-input"
        type="file"
        className="hidden"
        multiple
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/quicktime,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,audio/mpeg,audio/wav,audio/ogg"
        onChange={(event) => {
          if (!event.target.files) return
          void handleUploadFiles(event.target.files)
          event.target.value = ""
        }}
      />
    </div>
  )
}

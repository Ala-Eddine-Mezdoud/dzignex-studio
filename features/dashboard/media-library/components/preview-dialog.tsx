import { useMemo } from "react"
import { ArrowUpRight, Copy, Download, Trash2, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { formatFileSize, getPreviewType, MediaFile } from "../types"

interface PreviewDialogProps {
  file: MediaFile | null
  onClose: () => void
  onDelete: (file: MediaFile) => void
}

export function PreviewDialog({ file, onClose, onDelete }: PreviewDialogProps) {
  const previewType = useMemo(() => (file ? getPreviewType(file.name) : "other"), [file])

  if (!file) {
    return null
  }

  const copyUrl = async () => {
    await navigator.clipboard.writeText(file.url)
  }

  const downloadUrl = () => {
    window.open(file.url, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{file.name}</h2>
            <p className="text-sm text-muted-foreground">Preview asset details and actions.</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-input p-2 text-muted-foreground transition hover:border-primary hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          <div className="rounded-3xl border border-border bg-muted p-4">
            {previewType === "image" ? (
              <img src={file.url} alt={file.name} className="h-full w-full rounded-3xl object-contain" loading="lazy" />
            ) : previewType === "video" ? (
              <video controls src={file.url} className="h-full w-full rounded-3xl bg-black" />
            ) : previewType === "audio" ? (
              <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-3xl bg-background p-8 text-center">
                <div className="rounded-full bg-primary/10 p-6 text-primary">
                  <ArrowUpRight className="size-8" />
                </div>
                <p className="text-sm font-medium">Audio preview is available.</p>
                <audio controls src={file.url} className="w-full" />
              </div>
            ) : previewType === "pdf" ? (
              <iframe src={file.url} className="h-96 w-full rounded-3xl" title={file.name} />
            ) : (
              <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-3xl bg-muted text-muted-foreground">
                <span className="text-xl font-semibold">Preview not available</span>
                <p className="max-w-xs text-center text-sm">You can download or copy the file URL to use it elsewhere.</p>
              </div>
            )}
          </div>

          <div className="space-y-4 rounded-3xl border border-border bg-card p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{file.type}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Size</p>
              <p className="font-medium">{formatFileSize(file.size)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Modified</p>
              <p className="font-medium">{new Date(file.lastModified).toLocaleString()}</p>
            </div>
            <div className="grid gap-3 pt-4">
              <Button variant="outline" onClick={copyUrl}>
                <Copy className="size-4" />
                Copy URL
              </Button>
              <Button variant="secondary" onClick={downloadUrl}>
                <Download className="size-4" />
                Download
              </Button>
              <Button variant="destructive" onClick={() => onDelete(file)}>
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

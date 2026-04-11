import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { formatFileSize } from "../types"
import { UploadingFile } from "../types"

interface UploadDialogProps {
  open: boolean
  files: UploadingFile[]
  onClose: () => void
}

export function UploadDialog({ open, files, onClose }: UploadDialogProps) {
  const uploading = files.some((file) => file.status === "uploading")
  const total = files.length
  const completed = files.filter((file) => file.status === "completed").length
  const failed = files.filter((file) => file.status === "error").length

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Uploading files</h2>
            <p className="text-sm text-muted-foreground">Direct uploads happen through Cloudflare R2 with progress updates.</p>
          </div>
          <button onClick={onClose} className="text-sm font-medium text-muted-foreground hover:text-foreground" disabled={uploading}>
            Close
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {files.map((upload) => (
            <div key={upload.id} className="rounded-3xl border border-border p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{upload.file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(upload.file.size)}</p>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {upload.status === "uploading" ? "Uploading" : upload.status === "completed" ? "Completed" : "Error"}
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${upload.progress}%` }} />
              </div>

              {upload.error ? <p className="mt-2 text-sm text-destructive">{upload.error}</p> : null}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {completed} completed · {failed} failed · {total} total
          </div>
          <Button onClick={onClose} disabled={uploading}>
            {uploading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Finishing
              </span>
            ) : (
              "Done"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

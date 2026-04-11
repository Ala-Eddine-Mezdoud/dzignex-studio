import { Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { MediaItem } from "../types"

interface DeleteDialogProps {
  open: boolean
  items: MediaItem[]
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDialog({ open, items, onClose, onConfirm }: DeleteDialogProps) {
  if (!open) {
    return null
  }

  const isMultiple = items.length > 1
  const title = isMultiple ? "Delete selected items" : `Delete ${items[0].name}`
  const description = isMultiple
    ? "This will permanently remove the selected items and all contents in selected folders."
    : "This will permanently remove this item and cannot be undone."

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-start gap-4">
          <div className="rounded-3xl bg-destructive/10 p-3 text-destructive">
            <Trash2 className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

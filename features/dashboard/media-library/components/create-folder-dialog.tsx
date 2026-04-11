import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

interface CreateFolderDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (folderName: string) => Promise<void>
}

export function CreateFolderDialog({ open, onClose, onCreate }: CreateFolderDialogProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const isValid = useMemo(() => name.trim().length > 0, [name])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Create folder</h2>
            <p className="text-sm text-muted-foreground">Add a new folder to the current directory.</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Folder name</label>
            <Input
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setError("")
              }}
              placeholder="Enter folder name"
            />
            {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!isValid) {
                  setError("Folder name is required.")
                  return
                }

                setLoading(true)
                await onCreate(name.trim())
                setLoading(false)
                setName("")
              }}
              disabled={!isValid || loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span>Continue</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog"
import { AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { deleteProject } from "../../../../db-actions/projects"

interface ProjectDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  projectTitle: string
}

export function ProjectDeleteDialog({ open, onOpenChange, projectId, projectTitle }: ProjectDeleteDialogProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      const result = await deleteProject(projectId)

      if (!result.success) {
        throw new Error("Failed to delete project")
      }

      toast.success(`Project "${projectTitle}" deleted successfully`)
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error("Project deletion error:", error)
      toast.error(error instanceof Error ? error.message : "There was a problem deleting the project.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Project
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{projectTitle}"? This action cannot be undone and will permanently remove all project data, including details, images, and testimonials.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">Warning</p>
                <p className="text-sm text-muted-foreground">
                  This will permanently delete the project and all associated data. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

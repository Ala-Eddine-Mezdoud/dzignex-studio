"use client"

import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Switch } from "../../../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { getProjectBySlug, toggleProjectPublish } from "../../../../db-actions/projects"
import { Skeleton } from "../../components/ui/skeleton"
import { toast } from "sonner"

interface ProjectDetailsSheetProps {
  slug: string | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailsSheet({ slug, isOpen, onOpenChange }: ProjectDetailsSheetProps) {
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    if (isOpen && slug) {
      const fetchProject = async () => {
        setIsLoading(true)
        try {
          const data = await getProjectBySlug(slug)
          setProject(data)
        } catch (error) {
          console.error("Failed to fetch project details:", error)
          toast.error("Failed to load project details")
        } finally {
          setIsLoading(false)
        }
      }
      fetchProject()
    } else {
      setProject(null)
    }
  }, [isOpen, slug])

  const handleTogglePublish = async (checked: boolean) => {
    if (!project) return
    
    setIsPublishing(true)
    try {
      const result = await toggleProjectPublish(project.id, checked)
      if (result.success) {
        setProject({ ...project, isPublished: checked })
        toast.success(checked ? "Project published" : "Project unpublished")
      }
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto p-8">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Skeleton className="h-5 w-20" />
              ) : (
                <Badge variant={project?.isPublished ? "default" : "secondary"}>
                  {project?.isPublished ? "Published" : "Draft"}
                </Badge>
              )}
              {project?.category && <Badge variant="outline">{project.category}</Badge>}
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="published-status"
                disabled={isLoading || isPublishing || !project}
                checked={project?.isPublished || false}
                onCheckedChange={handleTogglePublish}
              />
              <Label htmlFor="published-status" className="text-xs">Published</Label>
            </div>
          </div>
          
          <SheetTitle asChild>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-64" /> : project?.title}
            </div>
          </SheetTitle>
          
          <SheetDescription asChild>
            <div className="text-sm text-muted-foreground">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                project?.summary
              )}
            </div>
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-6" />

        <div className="space-y-8 pb-10">
          {/* Thumbnail */}
          {project?.thumbnailUrl && !isLoading && (
            <div className="aspect-video relative rounded-lg overflow-hidden border bg-muted">
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Core Info Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</div>
              <div className="font-semibold">{isLoading ? <Skeleton className="h-4 w-32" /> : project?.clientName || "N/A"}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Services</div>
              <div className="flex flex-wrap gap-1">
                {isLoading ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  project?.services?.map((service: string) => (
                    <Badge key={service} variant="secondary" className="text-[10px]">
                      {service}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b pb-1">Full Description</h3>
            <div className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : (
                project?.description
              )}
            </div>
          </div>

          {/* Project Details Sections */}
          {project?.details && project.details.length > 0 && (
            <div className="space-y-6">
               <Separator className="bg-muted" />
               <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Case Study Sections</h3>
               
               <div className="space-y-10">
                {project.details.map((detail: any) => (
                  <div key={detail.id} className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg">{detail.label}</h4>
                      {detail.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap border-l-2 pl-4 py-1">
                          {detail.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {detail.images?.map((img: any) => (
                        <div key={img.id} className="rounded-lg overflow-hidden border bg-muted shadow-sm">
                          <img
                            src={img.imageUrl}
                            alt={img.altText || detail.label}
                            className="w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
               </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

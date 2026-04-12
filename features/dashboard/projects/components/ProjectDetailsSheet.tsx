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
import { Star, Quote, TrendingUp, Building2, User } from "lucide-react"

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
      <SheetContent className="sm:max-w-3xl overflow-y-auto p-0" showCloseButton={true}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
            <SheetHeader className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isLoading ? (
                    <Skeleton className="h-6 w-20 rounded-full" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={project?.isPublished ? "default" : "secondary"}
                        className="px-3 py-1 rounded-full font-medium"
                      >
                        {project?.isPublished ? "Published" : "Draft"}
                      </Badge>
                      {project?.category && (
                        <Badge variant="outline" className="px-3 py-1 rounded-full">
                          {project.category}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Label htmlFor="published-status" className="text-sm font-medium">Status</Label>
                  <Switch
                    id="published-status"
                    disabled={isLoading || isPublishing || !project}
                    checked={project?.isPublished || false}
                    onCheckedChange={handleTogglePublish}
                  />
                </div>
              </div>
              
              <SheetTitle asChild>
                <div className="text-3xl font-bold tracking-tight">
                  {isLoading ? <Skeleton className="h-10 w-96" /> : project?.title}
                </div>
              </SheetTitle>
              
              <SheetDescription asChild>
                <div className="text-base text-muted-foreground leading-relaxed">
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
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8 p-6">
            {/* Thumbnail */}
            {project?.thumbnailUrl && !isLoading && (
              <div className="aspect-video relative rounded-2xl overflow-hidden border shadow-lg">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Core Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Client</div>
                </div>
                <div className="text-lg font-semibold">{isLoading ? <Skeleton className="h-6 w-32" /> : project?.clientName || "N/A"}</div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Services</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {isLoading ? (
                    <Skeleton className="h-6 w-24 rounded-full" />
                  ) : (
                    project?.services?.map((service: string, index: number) => (
                      <Badge key={`${service}-${index}`} variant="secondary" className="px-3 py-1 rounded-full font-medium">
                        {service}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                Project Overview
              </h3>
              <div className="text-base leading-relaxed text-foreground/80 whitespace-pre-wrap">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  project?.description
                )}
              </div>
            </div>

            {/* Testimonials Section */}
            {project?.testimonial && (
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Quote className="h-5 w-5 text-primary" />
                  Client Testimonial
                </h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                    <p className="text-lg italic text-foreground/90 leading-relaxed pl-6">
                      "{project.testimonial.feedbackText}"
                    </p>
                  </div>
                  
                  <div className="flex items-start justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{project.testimonial.authorName}</div>
                        {(project.testimonial.authorRole || project.testimonial.authorCompany) && (
                          <div className="text-sm text-muted-foreground">
                            {project.testimonial.authorRole}
                            {project.testimonial.authorRole && project.testimonial.authorCompany && ", "}
                            {project.testimonial.authorCompany}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {project.testimonial.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Number(project.testimonial.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {project.testimonial.statValue && project.testimonial.statLabel && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{project.testimonial.statValue}</div>
                          <div className="text-xs text-muted-foreground">{project.testimonial.statLabel}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Details Sections */}
            {project?.details && project.details.length > 0 && (
              <div className="space-y-8">
                <div className="text-lg font-bold flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Case Study Details
                </div>
                
                <div className="space-y-8">
                  {project.details.map((detail: any) => (
                    <div key={detail.id} className="bg-card rounded-xl p-6 border shadow-sm">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="text-xl font-bold text-foreground">{detail.label}</h4>
                          {detail.description && (
                            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap border-l-4 border-primary/20 pl-4 py-2 bg-muted/50 rounded-r-lg">
                              {detail.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {detail.images?.map((img: any) => (
                            <div key={img.id} className="rounded-xl overflow-hidden border shadow-md">
                              <img
                                src={img.imageUrl}
                                alt={img.altText || detail.label}
                                className="w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

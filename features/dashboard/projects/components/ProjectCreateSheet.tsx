"use client"

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Label } from "../../../../components/ui/label"
import { Switch } from "../../../../components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../../components/ui/form"
import { Plus, Trash2, ImagePlus, Upload, Quote } from "lucide-react"
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop"
import { toast } from "sonner"
import { createProject } from "../actions/create-project"
import { getProjectUploadPresignedUrl } from "../actions/get-project-upload-presigned-url"

interface ProjectCreateSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type CroppedImage = {
  id: string
  url: string
  filename: string
}

type CropQueueItem = {
  id: string
  file: File
  previewUrl: string
  detailIndex: number
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  clientName: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  services: z.array(z.object({ value: z.string() })).optional(),
  isPublished: z.boolean(),
  details: z.array(z.object({
    label: z.string(),
    description: z.string().optional(),
    images: z.array(z.object({
      id: z.string(),
      url: z.string(),
      filename: z.string(),
    })),
  })),
  testimonials: z.array(z.object({
    authorName: z.string(),
    authorRole: z.string().optional(),
    authorCompany: z.string().optional(),
    feedbackText: z.string(),
    statValue: z.string().optional(),
    statLabel: z.string().optional(),
    rating: z.string().optional(),
  })),
})

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
}

function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

async function uploadToR2(file: File, folder: string): Promise<string> {
  const key = `${folder}/${crypto.randomUUID()}-${file.name}`
  const presign = await getProjectUploadPresignedUrl(key, file.type)

  if (!presign.success || !presign.data?.url) {
    throw new Error(presign.error || "Could not get upload URL.")
  }

  const response = await fetch(presign.data.url, {
    method: "PUT",
    mode: "cors",
    body: file,
  })

  if (!response.ok) {
    throw new Error(`Upload request failed ${response.status}`)
  }

  return presign.data.publicUrl
}

function convertCropToPixels(crop: PixelCrop | Crop, image: HTMLImageElement) {
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const x = crop.x ?? 0
  const y = crop.y ?? 0
  const width = crop.width ?? 0
  const height = crop.height ?? 0

  return {
    x: (crop.unit === "%" ? (x / 100) * image.width : x) * scaleX,
    y: (crop.unit === "%" ? (y / 100) * image.height : y) * scaleY,
    width: (crop.unit === "%" ? (width / 100) * image.width : width) * scaleX,
    height: (crop.unit === "%" ? (height / 100) * image.height : height) * scaleY,
  }
}

async function getCroppedDataUrl(
  image: HTMLImageElement,
  crop: PixelCrop | Crop
): Promise<string> {
  const pixelCrop = convertCropToPixels(crop, image)

  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(pixelCrop.width))
  canvas.height = Math.max(1, Math.round(pixelCrop.height))

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height
  )

  return canvas.toDataURL("image/jpeg", 0.9)
}

export function ProjectCreateSheet({ open, onOpenChange }: ProjectCreateSheetProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      description: "",
      category: "",
      clientName: "",
      thumbnailUrl: "",
      services: [],
      isPublished: false,
      details: [],
      testimonials: [],
    },
  })

  const { fields: detailFields, append: appendDetail, remove: removeDetail } = useFieldArray({
    control: form.control,
    name: "details",
  })

  const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
    control: form.control,
    name: "testimonials",
  })

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control: form.control,
    name: "services",
  })

    const [isSubmitting, setIsSubmitting] = useState(false)
  const [cropQueue, setCropQueue] = useState<CropQueueItem[]>([])
  const [cropSrc, setCropSrc] = useState("")
  const [crop, setCrop] = useState<Crop>({ unit: "%", x: 0, y: 0, width: 80, height: 45 })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const currentCropItem = cropQueue[0]
  const title = form.watch("title")
  const slug = form.watch("slug")

  useEffect(() => {
    if (title && !slug) {
      form.setValue("slug", slugify(title))
    }
  }, [title, slug, form])

  useEffect(() => {
    if (!open) {
      form.reset()
      cropQueue.forEach((item) => URL.revokeObjectURL(item.previewUrl))
      setCropQueue([])
      setCropSrc("")
      setCrop({ unit: "%", x: 0, y: 0, width: 80, height: 45 })
      setCompletedCrop(null)
    }
  }, [open, form])

  useEffect(() => {
    if (currentCropItem) {
      setCropSrc(currentCropItem.previewUrl)
      setCrop({ unit: "%", x: 0, y: 0, width: 80, height: 45 })
      setCompletedCrop(null)
      imageRef.current = null
    } else {
      setCropSrc("")
    }
  }, [currentCropItem])

  const handleAddDetail = () => {
    appendDetail({
      label: "",
      description: "",
      images: [],
    })
  }

  const handleRemoveDetail = (index: number) => {
    removeDetail(index)
  }

  const handleAddTestimonial = () => {
    appendTestimonial({
      authorName: "",
      authorRole: "",
      authorCompany: "",
      feedbackText: "",
      statValue: "",
      statLabel: "",
      rating: "",
    })
  }

  const handleRemoveTestimonial = (index: number) => {
    removeTestimonial(index)
  }

  const handleFileSelection = (detailIndex: number, files: FileList | null) => {
    if (!files?.length) {
      return
    }

    const newQueue = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      detailIndex,
    }))

    setCropQueue((prev) => [...prev, ...newQueue])
  }

  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const url = await uploadToR2(file, "projects/thumbnails")
      form.setValue('thumbnailUrl', url)
      toast.success("Thumbnail uploaded successfully")
    } catch (error) {
      console.error(error)
      toast.error("Failed to upload thumbnail")
    }
  }

  const handleCancelCrop = () => {
    if (currentCropItem) {
      URL.revokeObjectURL(currentCropItem.previewUrl)
    }
    setCropQueue((prev) => prev.slice(1))
  }

  const handleCropConfirm = async () => {
    if (!imageRef.current || !currentCropItem) {
      return
    }

    const cropValues = completedCrop ?? crop
    if (!cropValues.width || !cropValues.height) {
      toast.error("Please choose a crop area before confirming.")
      return
    }

    try {
      const croppedDataUrl = await getCroppedDataUrl(imageRef.current, cropValues)
      const blob = dataURLToBlob(croppedDataUrl)
      const fileName = `${crypto.randomUUID()}.jpg`
      const file = new File([blob], fileName, { type: 'image/jpeg' })
      const url = await uploadToR2(file, "projects/details")

      const currentDetails = form.getValues("details")
      const updatedDetails = [...currentDetails]
      updatedDetails[currentCropItem.detailIndex].images.push({
        id: crypto.randomUUID(),
        url,
        filename: currentCropItem.file.name,
      })
      form.setValue("details", updatedDetails)
      URL.revokeObjectURL(currentCropItem.previewUrl)
      setCropQueue((prev) => prev.slice(1))
      toast.success("Image uploaded successfully")
    } catch (error) {
      console.error(error)
      toast.error("Unable to upload image. Please try again.")
    }
  }

  const handleImageLoad = (image: HTMLImageElement) => {
    imageRef.current = image
    return false
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    const payload = {
      title: data.title,
      slug: data.slug || slugify(data.title),
      summary: data.summary || null,
      description: data.description || null,
      category: data.category || null,
      services: data.services?.map(service => service.value) || [],
      thumbnailUrl: data.thumbnailUrl || null,
      clientName: data.clientName || null,
      isPublished: data.isPublished,
      details: data.details.map((detail, index) => ({
        label: detail.label,
        description: detail.description || null,
        images: detail.images.map((image) => image.url),
        orderIndex: index,
      })),
      testimonials: data.testimonials.map((testimonial, index) => ({
        authorName: testimonial.authorName,
        authorRole: testimonial.authorRole || null,
        authorCompany: testimonial.authorCompany || null,
        feedbackText: testimonial.feedbackText,
        statValue: testimonial.statValue || null,
        statLabel: testimonial.statLabel || null,
        rating: testimonial.rating ? Number(testimonial.rating) : null,
        orderIndex: index,
      })),
    }

    try {
      const result = await createProject(payload)

      if (!result.success) {
        throw new Error(result?.error || "Failed to create project")
      }

      toast.success("Project created successfully")
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error("Project creation error:", error)
      toast.error(error instanceof Error ? error.message : "There was a problem creating the project.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const cropLabels = currentCropItem ? `${currentCropItem.file.name}` : ""

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-5xl overflow-y-auto p-0" showCloseButton={true}>
        <div className="h-full flex flex-col">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
            <div className="p-6 space-y-2">
              <SheetHeader className="space-y-2">
                <SheetTitle className="text-2xl font-bold tracking-tight">Add Project</SheetTitle>
                <SheetDescription className="text-base">
                  Create a portfolio entry with details, images, and testimonials.
                </SheetDescription>
              </SheetHeader>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8 p-6">
              {/* Basic Information Section */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Basic Information
                </h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Project title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="project-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client name</FormLabel>
                        <FormControl>
                          <Input placeholder="Client name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <FormLabel>Services</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendService({ value: "" })}>
                      <Plus className="mr-2 h-4 w-4" /> Add service
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {serviceFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`services.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="e.g. Branding" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => removeService(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {serviceFields.length === 0 && (
                      <p className="text-sm text-muted-foreground">No services added. Click "Add service" to add services.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Thumbnail</Label>
                    <div className="space-y-3">
                      <label className="inline-flex cursor-pointer items-center rounded-md border border-input bg-background px-3 py-2 text-sm transition hover:bg-accent/50">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Upload thumbnail</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbnailUpload}
                        />
                      </label>
                      
                      {form.watch("thumbnailUrl") && (
                        <div className="space-y-2">
                          <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-border">
                            <img 
                              src={form.watch("thumbnailUrl")} 
                              alt="Thumbnail preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Thumbnail uploaded successfully</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <span className="text-sm text-muted-foreground">
                            {field.value ? "Published" : "Draft"}
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Content
                </h3>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Short project summary"
                            className="min-h-[140px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Full project description"
                            className="min-h-[140px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    Project Details
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddDetail}>
                    <Plus className="mr-2 h-4 w-4" /> Add detail
                  </Button>
                </div>

                <div className="space-y-4">
                  {detailFields.map((field: any, index: number) => (
                    <div key={field.id} className="bg-background rounded-xl border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <FormField
                            control={form.control}
                            name={`details.${index}.label`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-medium">Section Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Challenge, Solution, Results" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveDetail(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name={`details.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Add details about this section"
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <Label className="font-medium">Images</Label>
                            <p className="text-xs text-muted-foreground">Upload images with 16:9 aspect ratio.</p>
                          </div>
                          <label className="inline-flex cursor-pointer items-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition hover:bg-accent/50">
                            <ImagePlus className="mr-2 h-4 w-4" />
                            <span>Add images</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(event) => {
                                handleFileSelection(index, event.target.files)
                                event.currentTarget.value = ""
                              }}
                            />
                          </label>
                        </div>

                        {form.watch(`details.${index}.images`).length > 0 && (
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {form.watch(`details.${index}.images`).map((image, imageIndex) => (
                              <div key={image.id} className="group relative overflow-hidden rounded-xl border bg-muted">
                                <img src={image.url} alt={image.filename} className="h-40 w-full object-cover" />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-2 top-2 rounded-full bg-background/90 opacity-0 transition group-hover/relative:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                                  onClick={() => {
                                    const currentImages = form.getValues(`details.${index}.images`)
                                    const updatedImages = currentImages.filter((_, i) => i !== imageIndex)
                                    form.setValue(`details.${index}.images`, updatedImages)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Quote className="h-5 w-5 text-primary" />
                    Client Testimonials
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddTestimonial}>
                    <Plus className="mr-2 h-4 w-4" /> Add testimonial
                  </Button>
                </div>

                <div className="space-y-4">
                  {testimonialFields.map((field: any, index: number) => (
                    <div key={field.id} className="bg-background rounded-xl border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.authorName`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="font-medium">Client Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveTestimonial(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.authorRole`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Role</FormLabel>
                              <FormControl>
                                <Input placeholder="CEO, Manager, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.authorCompany`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`testimonials.${index}.feedbackText`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Testimonial</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What did the client say about the project?"
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-4 md:grid-cols-3">
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.statValue`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Stat Value</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. +150%" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.statLabel`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Stat Label</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Revenue Growth" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.rating`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Rating</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} max={5} placeholder="0-5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <Dialog
          open={Boolean(currentCropItem)}
          onOpenChange={(open) => {
            if (!open) {
              cropQueue.forEach((item) => URL.revokeObjectURL(item.previewUrl))
              setCropQueue([])
            }
          }}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Crop image</DialogTitle>
              <DialogDescription>
                Confirm the locked 16:9 crop before adding the image to the detail section.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-xl border bg-muted p-4">
                <p className="text-sm font-medium">{cropLabels}</p>
              </div>

              {cropSrc ? (
                <div className="rounded-xl border p-2">
                  <ReactCrop
                    crop={crop}
                    aspect={16 / 9}
                    onChange={(nextCrop) => setCrop(nextCrop)}
                    onComplete={(nextCrop) => setCompletedCrop(nextCrop)}
                  >
                    <img
                      src={cropSrc}
                      alt="Crop preview"
                      ref={(img) => {
                        if (img) imageRef.current = img
                      }}
                      onLoad={(event) => handleImageLoad(event.currentTarget)}
                      className="max-h-[460px] w-full object-contain"
                    />
                  </ReactCrop>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                  No image selected.
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCancelCrop}>
                Cancel
              </Button>
              <Button type="button" onClick={handleCropConfirm}>
                Confirm crop
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  )
}

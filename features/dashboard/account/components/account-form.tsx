"use client"

import { useState, useRef, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../../../components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../../components/ui/form"
import { Camera, Loader2, User } from "lucide-react"
import { toast } from "sonner"
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { updateCurrentUser, updateUserAvatar, getAvatarUploadUrl } from "../actions"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface AccountFormProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
    createdAt: Date | null
  }
}

function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(",")
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function AccountForm({ user }: AccountFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email,
    },
  })

  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    imageRef.current = img
    return false
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result as string)
      setCropDialogOpen(true)
    }
    reader.readAsDataURL(file)

    // Reset file input
    event.target.value = ""
  }

  const getCroppedImage = async (): Promise<Blob | null> => {
    if (!imageRef.current || !completedCrop) return null

    const image = imageRef.current
    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = completedCrop.width * scaleX
    canvas.height = completedCrop.height * scaleY

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9)
    })
  }

  const handleCropConfirm = async () => {
    if (!completedCrop?.width || !completedCrop?.height) {
      toast.error("Please select a crop area")
      return
    }

    setIsUploading(true)
    try {
      const blob = await getCroppedImage()
      if (!blob) {
        toast.error("Failed to process image")
        return
      }

      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" })
      const key = `avatars/${user.id}/${Date.now()}-avatar.jpg`

      const result = await getAvatarUploadUrl(key, file.type)
      if (!result.success || !result.data?.url) {
        toast.error(result.error || "Failed to get upload URL")
        return
      }

      // Upload to R2
      const uploadResponse = await fetch(result.data.url, {
        method: "PUT",
        mode: "cors",
        body: file,
      })

      if (!uploadResponse.ok) {
        throw new Error("Upload failed")
      }

      // Update user avatar
      const updateResult = await updateUserAvatar(user.id, result.data.publicUrl)
      if (updateResult.success) {
        toast.success("Avatar updated successfully")
        // Update local state
        user.image = result.data.publicUrl
      } else {
        toast.error("Failed to update avatar")
      }
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast.error("Failed to upload avatar")
    } finally {
      setIsUploading(false)
      setCropDialogOpen(false)
      setImageSrc(null)
      setCompletedCrop(null)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      const result = await updateCurrentUser(user.id, data)
      if (result.success) {
        toast.success("Profile updated successfully")
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Avatar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Upload a profile picture to personalize your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                  <AvatarFallback className="text-2xl">
                    {user.name?.charAt(0)?.toUpperCase() || <User className="h-8 w-8" />}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Upload new avatar</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max 5MB. Click the camera icon to upload.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-4 pt-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Role</Label>
                <p className="font-medium capitalize">{user.role.toLowerCase()}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">Member Since</Label>
                <p className="font-medium">
                  {user.createdAt ? format(new Date(user.createdAt), "dd MMM yyyy") : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Crop Avatar</DialogTitle>
            <DialogDescription>
              Adjust the crop area to select your profile picture. The image will be cropped to a circle.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            {imageSrc && (
              <div className="rounded-full overflow-hidden border-4 border-primary/20">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={(img) => {
                      if (img) handleImageLoad(img)
                    }}
                    src={imageSrc}
                    alt="Crop preview"
                    className="max-h-[300px] max-w-full object-contain"
                  />
                </ReactCrop>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCropDialogOpen(false)
                  setImageSrc(null)
                  setCompletedCrop(null)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCropConfirm} disabled={isUploading}>
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload Avatar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

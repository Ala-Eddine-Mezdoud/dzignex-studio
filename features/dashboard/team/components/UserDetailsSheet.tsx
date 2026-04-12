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
import { Button } from "../../components/ui/button"
import { getUserById, updateUser, deleteUser, sendPasswordReset, sendMagicLink } from "../../../../db-actions/user"
import { Skeleton } from "../../components/ui/skeleton"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog"
import { Mail, Calendar, Shield, Ban, ShieldAlert, CheckCircle } from "lucide-react"

interface UserDetailsSheetProps {
  userId: string | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailsSheet({ userId, isOpen, onOpenChange }: UserDetailsSheetProps) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSendingReset, setIsSendingReset] = useState(false)
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (isOpen && userId) {
      const fetchUser = async () => {
        setIsLoading(true)
        try {
          const data = await getUserById(userId)
          setUser(data)
        } catch (error) {
          console.error("Failed to fetch user details:", error)
          toast.error("Failed to load user details")
        } finally {
          setIsLoading(false)
        }
      }
      fetchUser()
    } else {
      setUser(null)
    }
  }, [isOpen, userId])

  const handleToggleBan = async (checked: boolean) => {
    if (!user) return
    setIsUpdating(true)
    try {
      const result = await updateUser(user.id, { banned: checked, bannedAt: checked ? new Date() : null })
      if (result) {
        setUser({ ...user, banned: checked })
        toast.success(checked ? "User banned" : "User unbanned")
      }
    } catch (error) {
      toast.error("Failed to update user status")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleForceLogout = async () => {
    if (!user) return
    setIsUpdating(true)
    try {
      const result = await updateUser(user.id, { sessionVersion: (user.sessionVersion || 1) + 1 })
      if (result) {
        setUser({ ...user, sessionVersion: (user.sessionVersion || 1) + 1 })
        toast.success("User forced to log out on next refresh")
      }
    } catch (error) {
      toast.error("Failed to force logout")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteUser = () => {
    if (!user) return
    setShowDeleteDialog(true)
  }

  const confirmDeleteUser = async () => {
    if (!user) return
    setIsUpdating(true)
    setShowDeleteDialog(false)
    try {
      const result = await deleteUser(user.id)
      if (result.success) {
        toast.success("User deleted successfully")
        onOpenChange(false)
      }
    } catch (error) {
      toast.error("Failed to delete user")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSendResetPassword = async () => {
    if (!user) return
    setIsSendingReset(true)
    const result = await sendPasswordReset(user.id)
    if (result.success) {
      toast.success("Password reset email sent successfully")
    } else {
      toast.error(result.error || "Failed to send password reset email")
    }
    setIsSendingReset(false)
  }

  const handleSendMagicLink = async () => {
    if (!user) return
    setIsSendingMagicLink(true)
    const result = await sendMagicLink(user.id)
    if (result.success) {
      toast.success("Magic link email sent successfully")
    } else {
      toast.error(result.error || "Failed to send magic link email")
    }
    setIsSendingMagicLink(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto p-0 gap-0">
        <div className="p-8 space-y-8">
          <SheetHeader className="space-y-1">
            <SheetTitle asChild>
              <div className="text-2xl font-bold tracking-tight">User Details</div>
            </SheetTitle>
            <SheetDescription asChild>
              <div className="text-sm text-muted-foreground">
                Comprehensive profile information for {isLoading ? <Skeleton className="h-4 w-20 inline-block" /> : <span className="font-medium text-foreground">{user?.name}</span>}
              </div>
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-3">
             <Button
                variant="outline"
                className="w-full justify-start h-11"
                onClick={handleSendResetPassword}
                disabled={isLoading || isSendingReset || !user}
             >
                <Shield className="mr-2 h-4 w-4 text-primary" />
                {isSendingReset ? "Sending..." : "Send Reset Password"}
             </Button>
             <Button
                variant="outline"
                className="w-full justify-start h-11"
                onClick={handleSendMagicLink}
                disabled={isLoading || isSendingMagicLink || !user}
             >
                <Mail className="mr-2 h-4 w-4 text-primary" />
                {isSendingMagicLink ? "Sending..." : "Send Magic Link"}
             </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4 p-5 rounded-xl border bg-muted/30">
               <div className="flex justify-between items-center">
                 <span className="text-sm text-muted-foreground">Name</span>
                 <span className="text-sm font-medium">{isLoading ? <Skeleton className="h-4 w-32" /> : user?.name || "N/A"}</span>
               </div>
               <Separator className="opacity-50" />
               <div className="flex justify-between items-center">
                 <span className="text-sm text-muted-foreground">Email</span>
                 <span className="text-sm font-medium">{isLoading ? <Skeleton className="h-4 w-48" /> : user?.email}</span>
               </div>
               <Separator className="opacity-50" />
               <div className="flex justify-between items-center">
                 <span className="text-sm text-muted-foreground">Role</span>
                 <Badge variant="outline" className="font-semibold uppercase text-[10px] tracking-widest bg-background">
                   {isLoading ? <Skeleton className="h-3 w-12" /> : user?.role || "USER"}
                 </Badge>
               </div>
               <Separator className="opacity-50" />
               <div className="flex justify-between items-center">
                 <span className="text-sm text-muted-foreground">Joined Date</span>
                 <span className="text-sm font-medium">
                   {isLoading ? <Skeleton className="h-4 w-24" /> : user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB") : "N/A"}
                 </span>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">Acknowledgment</h3>
            <div className="p-5 rounded-xl border bg-muted/30 flex justify-between items-center">
              <div className="space-y-0.5 flex">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">User acknowledged DZIGNEX terms</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 text-destructive">
               <ShieldAlert className="h-5 w-5" />
               <h3 className="text-sm font-bold uppercase tracking-wider">Danger Zone</h3>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">These actions are irreversible. Please be certain before proceeding.</p>
            
            <div className="space-y-3 p-5 rounded-xl border border-destructive/20 bg-destructive/5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ban-status" className="text-sm font-semibold">Ban User</Label>
                    <p className="text-xs text-muted-foreground">Temporarily restrict access</p>
                  </div>
                  <Switch
                    id="ban-status"
                    disabled={isLoading || isUpdating || !user}
                    checked={user?.banned || false}
                    onCheckedChange={handleToggleBan}
                  />
                </div>
                
                <Separator className="bg-destructive/10" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold">Force Logout</span>
                    <p className="text-xs text-muted-foreground">End all active sessions</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={handleForceLogout}
                    disabled={isLoading || isUpdating || !user}
                  >
                    Logout
                  </Button>
                </div>

                <Separator className="bg-destructive/10" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold">Delete User</span>
                    <p className="text-xs text-muted-foreground">Permanently remove user data</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="bg-destructive hover:bg-destructive/90"
                    onClick={handleDeleteUser}
                    disabled={isLoading || isUpdating || !user}
                  >
                    Delete
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </SheetContent>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action is irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser} disabled={isUpdating}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sheet>
  )
}


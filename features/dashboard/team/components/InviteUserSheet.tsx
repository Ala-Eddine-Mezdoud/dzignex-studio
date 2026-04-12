"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../../components/ui/sheet"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Mail, Send } from "lucide-react"
import { toast } from "sonner"
import { sendInvitation } from "../../../../db-actions/invites"

interface InviteUserSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUserId: string
}

export function InviteUserSheet({ open, onOpenChange, currentUserId }: InviteUserSheetProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Please enter an email address")
      return
    }

    setIsSubmitting(true)

    try {
      // Send invitation (creates token and sends email)
      await sendInvitation(email, currentUserId)

      toast.success(`Invitation sent to ${email}`)
      setEmail("")
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error("Invite error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to send invitation")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 py-4">
            <Mail className="h-5 w-5" />
            Invite Team Member
          </SheetTitle>
          <SheetDescription>
            Send an invitation to join your Dzignex Studio team. The invited user will receive an email with a link to set up their account.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="team-member@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              The invitation will be sent to this email address
            </p>
          </div>

          <div className="rounded-lg border border-muted bg-muted/50 p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">What happens next?</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>1. We'll send an invitation email with a unique link</li>
                <li>2. The link expires in 7 days and can only be used once</li>
                <li>3. They'll set up their name and password to join</li>
                <li>4. They'll have access as a regular team member</li>
              </ul>
            </div>
          </div>
        </form>

        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? (
              <>
                <Mail className="mr-2 h-4 w-4 animate-pulse" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Invitation
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

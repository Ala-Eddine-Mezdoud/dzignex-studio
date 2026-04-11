"use client"

import { format } from "date-fns"
import { cn } from "../../../../lib/utils"
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
  Paperclip,
  Globe,
  MessageSquare,
  Building,
  User,
  Mail,
  Phone,
  Briefcase
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import { Label } from "../../components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { Textarea } from "../../../../components/ui/textarea"
import { Switch } from "../../../../components/ui/switch"

interface Message {
  id: string
  fullName: string
  email: string
  whatsappNumber: string
  companyName: string
  industry: string
  serviceRequired: string
  websiteOrInstagram: string | null
  message: string | null
  status: "UNREAD" | "READ" | "REPLIED"
  createdAt: Date
}

interface MessageDisplayProps {
  message: Message | null
}

export function MessageDisplay({ message }: MessageDisplayProps) {
  if (!message) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        Select a message to view its details
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!message}>
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!message}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">

        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!message}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex items-start justify-between p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-dzignex-blue/10 h-12 w-12 flex items-center justify-center border border-dzignex-blue/20">
              <User className="h-6 w-6 text-dzignex-blue" />
            </div>
            <div className="grid gap-1">
              <div className="font-bold text-xl uppercase tracking-tighter">
                {message.fullName}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <div className="text-xs flex items-center gap-1.5 text-muted-foreground font-medium">
                  <Mail className="h-3.5 w-3.5 text-dzignex-blue" />
                  {message.email}
                </div>
                <div className="text-xs flex items-center gap-1.5 text-muted-foreground font-medium">
                  <Phone className="h-3.5 w-3.5 text-dzignex-blue" />
                  {message.whatsappNumber}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={cn(
              "px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded",
              message.status === "UNREAD" ? "bg-dzignex-blue text-white" : "bg-muted text-muted-foreground"
            )}>
              {message.status === "UNREAD" ? "New Message" : message.status}
            </div>
            {message.createdAt && (
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-tight">
                {format(new Date(message.createdAt), "PPpp")}
              </div>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-4 w-4 text-dzignex-blue" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Organization</span>
              </div>
              <p className="text-sm font-semibold">{message.companyName}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {message.industry}
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-dzignex-blue" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Requested Service</span>
              </div>
              <p className="text-sm font-semibold">{message.serviceRequired}</p>
            </div>

            {message.websiteOrInstagram && (
              <div className="rounded-lg border bg-card p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-dzignex-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Online Presence</span>
                </div>
                <a 
                  href={message.websiteOrInstagram.startsWith('http') ? message.websiteOrInstagram : `https://${message.websiteOrInstagram}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-dzignex-blue hover:underline break-all"
                >
                  {message.websiteOrInstagram}
                </a>
              </div>
            )}
          </div>
          
          <div className="rounded-lg border bg-dzignex-blue/5 border-dzignex-blue/10 p-5 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4 text-dzignex-blue" />
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-dzignex-blue">Full Inquiry</span>
            </div>
            <div className="text-base text-dzignex-white/90 leading-relaxed whitespace-pre-wrap font-medium flex-1">
              {message.message || "No project details provided."}
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="mt-auto" />
      <div className="p-4">
        <form>
          <div className="grid gap-4">
            <Textarea
              className="p-4 rounded-none border-dzignex-white/10"
              placeholder={`Reply ${message.fullName}...`}
            />
            <div className="flex items-center">
              <Label
                htmlFor="mute"
                className="flex items-center gap-2 text-xs font-normal"
              >
                <Switch id="mute" aria-label="Mute thread" /> Mute this thread
              </Label>
              <Button
                onClick={(e) => e.preventDefault()}
                size="sm"
                className="ml-auto bg-dzignex-blue text-white rounded-none uppercase font-bold px-8"
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


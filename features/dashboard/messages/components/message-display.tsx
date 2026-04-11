"use client"

import { format } from "date-fns"
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
                <ArchiveX className="h-4 w-4" />
                <span className="sr-only">Move to junk</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to junk</TooltipContent>
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
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!message}>
                <Clock className="h-4 w-4" />
                <span className="sr-only">Snooze</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Snooze</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!message}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!message}>
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!message}>
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
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
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <div className="grid gap-1">
              <div className="font-semibold text-lg flex items-center gap-2">
                <User className="h-4 w-4 text-dzignex-blue" />
                {message.fullName}
              </div>
              <div className="text-xs flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3 w-3" />
                {message.email}
              </div>
              <div className="text-xs flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3 w-3" />
                {message.whatsappNumber}
              </div>
            </div>
          </div>
          {message.createdAt && (
            <div className="ml-auto text-xs text-muted-foreground">
              {format(new Date(message.createdAt), "PPpp")}
            </div>
          )}
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
          
          <div className="rounded-lg border bg-card p-4 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Details</span>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
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


"use client"

import * as React from "react"
import { formatDistanceToNow } from "date-fns"
import { ArchiveX, File, Inbox, Send, Trash2, Tag, Flag, AlertTriangle } from "lucide-react"

import { Label } from "../../components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInput,
  SidebarGroup,
  SidebarGroupContent,
} from "../../components/ui/sidebar"
import { Switch } from "../../../../components/ui/switch"
import { cn } from "../../../../lib/utils"

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
  label: "important" | "normal" | "scam" | null
  createdAt: Date
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  messages: Message[]
  selectedId: string | null
  onSelectMessage: (id: string) => void
}

export function AppSidebar({ messages, selectedId, onSelectMessage, className, ...props }: AppSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showUnreadsOnly, setShowUnreadsOnly] = React.useState(false)

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          msg.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          msg.message?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesUnread = showUnreadsOnly ? msg.status === "UNREAD" : true
    
    return matchesSearch && matchesUnread
  })

  return (
    <Sidebar collapsible="none" className={cn("border-r", className)} {...props}>
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-bold uppercase tracking-tight text-foreground">
            Inbox
          </div>
          <Label className="flex items-center gap-2 text-sm">
            <span className="text-xs font-medium text-muted-foreground uppercase">Unreads</span>
            <Switch 
              checked={showUnreadsOnly} 
              onCheckedChange={setShowUnreadsOnly}
              className="shadow-none" 
            />
          </Label>
        </div>
        <SidebarInput 
          placeholder="Search projects..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground uppercase font-bold tracking-widest">
                No messages found
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => onSelectMessage(msg.id)}
                  className={cn(
                    "flex w-full flex-col items-start gap-2 border-b p-4 text-left text-sm leading-tight transition-all hover:bg-sidebar-accent",
                    selectedId === msg.id && "bg-sidebar-accent",
                    msg.status === "UNREAD" && "border-l-4 border-l-dzignex-blue"
                  )}
                >
                  <div className="flex w-full items-center gap-2">
                    <span className={cn("font-bold truncate", msg.status === "UNREAD" && "text-dzignex-blue")}>
                      {msg.fullName}
                    </span>{" "}
                    <span className="ml-auto text-[10px] text-muted-foreground uppercase font-bold whitespace-nowrap">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {msg.label && (
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded text-white uppercase font-bold tracking-tighter flex items-center gap-1",
                        msg.label === "important" && "bg-red-500",
                        msg.label === "normal" && "bg-blue-500",
                        msg.label === "scam" && "bg-yellow-500"
                      )}>
                        {msg.label === "important" && <Flag className="h-3 w-3" />}
                        {msg.label === "normal" && <Tag className="h-3 w-3" />}
                        {msg.label === "scam" && <AlertTriangle className="h-3 w-3" />}
                        {msg.label}
                      </span>
                    )}
                    <span className="text-[10px] bg-dzignex-white/5 px-1.5 py-0.5 rounded text-muted-foreground uppercase font-bold tracking-tighter">
                      {msg.companyName}
                    </span>
                    <span className="text-[10px] bg-dzignex-blue/10 px-1.5 py-0.5 rounded text-dzignex-blue uppercase font-bold tracking-tighter">
                      {msg.serviceRequired}
                    </span>
                  </div>
                  <span className="line-clamp-2 text-xs text-muted-foreground/80 leading-relaxed">
                    {msg.message || "No project details."}
                  </span>
                </button>
              ))
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

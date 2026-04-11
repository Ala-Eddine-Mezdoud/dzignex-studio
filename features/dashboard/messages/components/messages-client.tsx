"use client"

import * as React from "react"
import { AppSidebar } from "./side-bar"
import { MessageDisplay } from "./message-display"
import { SidebarProvider } from "../../components/ui/sidebar"

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

interface MessagesClientProps {
  messages: Message[]
}

export function MessagesClient({ messages }: MessagesClientProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(
    messages.length > 0 ? messages[0].id : null
  )

  const selectedMessage = React.useMemo(
    () => messages.find((m) => m.id === selectedId) || null,
    [messages, selectedId]
  )

  return (
    <SidebarProvider>
      <div className="flex h-full w-full overflow-hidden bg-background">
        <AppSidebar
          messages={messages}
          selectedId={selectedId}
          onSelectMessage={setSelectedId}
          className="w-[350px] shrink-0"
        />
        <main className="flex-1 overflow-y-auto">
          <MessageDisplay message={selectedMessage} />
        </main>
      </div>
    </SidebarProvider>
  )
}

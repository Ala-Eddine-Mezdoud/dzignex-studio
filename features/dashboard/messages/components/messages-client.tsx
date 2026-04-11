"use client"

import * as React from "react"
import { AppSidebar } from "./side-bar"
import { MessageDisplay } from "./message-display"
import { SidebarProvider } from "../../components/ui/sidebar"
import { updateMessageStatus } from "../../../../db-actions/messages"

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

export function MessagesClient({ messages: initialMessages }: MessagesClientProps) {
  const [messages, setMessages] = React.useState(initialMessages)
  const [selectedId, setSelectedId] = React.useState<string | null>(
    messages.length > 0 ? messages[0].id : null
  )

  // Update local state when props change
  React.useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  // Mark message as read when selected
  React.useEffect(() => {
    if (selectedId) {
      const message = messages.find((m) => m.id === selectedId)
      if (message && message.status === "UNREAD") {
        // Optimistically update local state
        setMessages((prev) =>
          prev.map((m) => (m.id === selectedId ? { ...m, status: "READ" } : m))
        )
        // Update in database
        updateMessageStatus(selectedId, "READ").catch((error) => {
          console.error("Failed to update message status:", error)
          // Revert local state on error
          setMessages((prev) =>
            prev.map((m) => (m.id === selectedId ? { ...m, status: "UNREAD" } : m))
          )
        })
      }
    }
  }, [selectedId, messages])

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


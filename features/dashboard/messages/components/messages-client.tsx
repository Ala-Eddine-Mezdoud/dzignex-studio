"use client"

import * as React from "react"
import { toast } from "sonner"
import { AppSidebar } from "./side-bar"
import { MessageDisplay } from "./message-display"
import { SidebarProvider } from "../../components/ui/sidebar"
import { updateMessageStatus, deleteMessage, updateMessageLabel, type MessageLabel } from "../../../../db-actions/messages"

interface Message {
  id: string
  fullName: string
  email: string
  whatsappNumber: string
  companyName: string
  industry: string
  serviceRequired: string
  websiteOrInstagram: string | null
  budgetRange: string | null
  challenges: string | null
  mainGoal: string | null
  message: string | null
  status: "UNREAD" | "READ" | "REPLIED"
  label: "important" | "normal" | "scam" | null
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
  const processedRef = React.useRef<Set<string>>(new Set())

  // Update local state when props change
  React.useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  // Mark message as read when selected
  React.useEffect(() => {
    if (selectedId) {
      const message = messages.find((m) => m.id === selectedId)
      if (message && message.status === "UNREAD" && !processedRef.current.has(selectedId)) {
        processedRef.current.add(selectedId)
        // Optimistically update local state
        setMessages((prev) =>
          prev.map((m) => (m.id === selectedId ? { ...m, status: "READ" } : m))
        )
        // Update in database
        updateMessageStatus(selectedId, "READ")
          .then(() => {
            toast.success("Marked as read", {
              description: `Message from ${message.fullName} marked as read.`,
            })
          })
          .catch((error) => {
            console.error("Failed to update message status:", error)
            // Revert local state on error
            setMessages((prev) =>
              prev.map((m) => (m.id === selectedId ? { ...m, status: "UNREAD" } : m))
            )
            toast.error("Failed to mark as read", {
              description: "Please try again later.",
            })
          })
      }
    }
  }, [selectedId])

  const selectedMessage = React.useMemo(
    () => messages.find((m) => m.id === selectedId) || null,
    [messages, selectedId]
  )

  const handleDeleteMessage = React.useCallback(async (id: string) => {
    const message = messages.find((m) => m.id === id)
    try {
      await deleteMessage(id)
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selectedId === id) {
        const remaining = messages.filter((m) => m.id !== id)
        setSelectedId(remaining.length > 0 ? remaining[0].id : null)
      }
      toast.success("Message deleted", {
        description: `Deleted message from ${message?.fullName || "Unknown"}`,
      })
    } catch (error) {
      console.error("Failed to delete message:", error)
      toast.error("Failed to delete message", {
        description: "Please try again later.",
      })
    }
  }, [selectedId, messages])

  const handleMarkAsUnread = React.useCallback(async (id: string) => {
    const message = messages.find((m) => m.id === id)
    try {
      processedRef.current.delete(id)
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "UNREAD" } : m))
      )
      await updateMessageStatus(id, "UNREAD")
      toast.success("Marked as unread", {
        description: `Message from ${message?.fullName || "Unknown"} marked as unread.`,
      })
    } catch (error) {
      console.error("Failed to mark as unread:", error)
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "READ" } : m))
      )
      toast.error("Failed to mark as unread", {
        description: "Please try again later.",
      })
    }
  }, [messages])

  const handleUpdateLabel = React.useCallback(async (id: string, label: MessageLabel) => {
    const message = messages.find((m) => m.id === id)
    const labelText = label.charAt(0).toUpperCase() + label.slice(1)
    try {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, label } : m))
      )
      await updateMessageLabel(id, label)
      toast.success("Label updated", {
        description: `Message from ${message?.fullName || "Unknown"} marked as ${labelText}.`,
      })
    } catch (error) {
      console.error("Failed to update label:", error)
      toast.error("Failed to update label", {
        description: "Please try again later.",
      })
    }
  }, [messages])

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
          <MessageDisplay
            message={selectedMessage}
            onDelete={handleDeleteMessage}
            onMarkAsUnread={handleMarkAsUnread}
            onUpdateLabel={handleUpdateLabel}
          />
        </main>
      </div>
    </SidebarProvider>
  )
}


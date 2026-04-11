import { MessagesClient } from "../../../features/dashboard/messages/components/messages-client"
import { getMessages } from "../../../db-actions/messages"

export default async function Page() {
  const messages = await getMessages()

  return (
    <div className="flex h-[calc(100svh-var(--header-height))] overflow-hidden">
      <MessagesClient messages={messages as any} />
    </div>
  )
}

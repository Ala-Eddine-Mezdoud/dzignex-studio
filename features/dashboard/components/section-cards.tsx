import { IconFolder, IconUsers, IconMail, IconPhoto } from "@tabler/icons-react"

import { Badge } from "./ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface SectionCardsProps {
  kpis: {
    totalProjects: number
    publishedProjects: number
    teamMembers: number
    unreadMessages: number
    totalMessages: number
    storageUsed: string
  }
}

export function SectionCards({ kpis }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Projects</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis.totalProjects}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {kpis.publishedProjects} published
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Portfolio size <IconFolder className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {kpis.publishedProjects} published, {kpis.totalProjects - kpis.publishedProjects} draft
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Team Members</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis.teamMembers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              Active team
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Registered users <IconUsers className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Active team members
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Unread Messages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis.unreadMessages}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {kpis.totalMessages} total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pending inquiries <IconMail className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {kpis.unreadMessages} unread of {kpis.totalMessages} total messages
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Storage Used</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {kpis.storageUsed}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              Total storage
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Media library <IconPhoto className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total storage used across all media
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

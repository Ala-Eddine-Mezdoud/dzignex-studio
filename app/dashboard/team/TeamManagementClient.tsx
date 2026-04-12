"use client"

import { useState } from "react"
import { DataTable } from "../../../features/dashboard/team/components/data-table"
import { User } from "../../../features/dashboard/team/components/columns"
import { InviteUserSheet } from "../../../features/dashboard/team/components/InviteUserSheet"

interface TeamManagementClientProps {
  users: User[]
  currentUserId: string
}

export default function TeamManagementClient({ users, currentUserId }: TeamManagementClientProps) {
  const [showInviteSheet, setShowInviteSheet] = useState(false)

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Team Management</h1>
          <p className="text-muted-foreground">Manage your studio team members and their permissions.</p>
        </div>
      </div>
      
      <DataTable data={users} onInviteClick={() => setShowInviteSheet(true)} />
      
      <InviteUserSheet 
        open={showInviteSheet} 
        onOpenChange={setShowInviteSheet}
        currentUserId={currentUserId}
      />
    </div>
  )
}

import { DataTable } from "../../../features/dashboard/team/components/data-table"
import { User } from "../../../features/dashboard/team/components/columns"
import { getUsers } from "../../../db-actions/user"
import { InviteUserSheet } from "../../../features/dashboard/team/components/InviteUserSheet"
import { auth } from "../../../auth"
import TeamManagementClient from "./TeamManagementClient"

export default async function TeamPage() {
  const users = await getUsers()
  
  // Get current user
  const session = await auth()
  const currentUserId = session?.user?.id || ""

  return <TeamManagementClient users={users as User[]} currentUserId={currentUserId} />
}
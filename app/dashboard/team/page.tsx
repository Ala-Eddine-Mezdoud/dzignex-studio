import { DataTable } from "../../../features/dashboard/team/components/data-table"
import { User } from "../../../features/dashboard/team/components/columns"
import { getUsers } from "../../../db-actions/user"

export default async function TeamPage() {
  const users = await getUsers()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Team Management</h1>
          <p className="text-muted-foreground">Manage your studio team members and their permissions.</p>
        </div>
      </div>
      <DataTable data={users as User[]} />
    </div>
  )
}
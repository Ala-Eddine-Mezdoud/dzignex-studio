import { auth, signOut } from "../../../auth"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../../../features/dashboard/account/actions/get-current-user"
import { AccountForm } from "../../../features/dashboard/account/components/account-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account Settings | Dzignex Studio",
  description: "Manage your account settings and profile",
}

export default async function AccountPage() {
  const session = await auth()

  // Check if user is logged in (has session)
  if (!session?.user?.email) {
    redirect("/sign-in")
  }

  // Get user - try by id first, fallback to email lookup if id missing
  let user = null
  if (session.user.id) {
    user = await getCurrentUser(session.user.id)
  }
  


  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your profile information and account settings
          </p>
        </div>
      </div>

      <AccountForm 
        user={{
          id: user!.id,
          name: user!.name,
          email: user!.email || "",
          image: user!.image,
          role: user!.role,
          createdAt: user!.createdAt || null,
        }} 
      />
    </div>
  )
}

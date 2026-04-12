import { signIn } from "../../../../auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { cn } from "../../../../lib/utils"
import { Button } from "../../../../components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field"
import { Input } from "../../../../components/ui/input"
import Link from "next/link"

interface LoginFormProps extends React.ComponentProps<"form"> {
  error?: string
  message?: string
}

const getErrorMessage = (errorCode: string | undefined) => {
  switch (errorCode) {
    case "InvalidCredentials":
      return "Invalid email or password"
    case "BannedUser":
      return "Your account is restricted. Contact support for more information."
    case "InvalidMagicLink":
      return "Magic link is invalid or has expired"
    case "InvalidOrExpiredToken":
      return "Password reset link is invalid or has already been used"
    case "UserNotFound":
      return "User not found"
    default:
      return null
  }
}

const getSuccessMessage = (messageCode: string | undefined) => {
  switch (messageCode) {
    case "PasswordResetSuccess":
      return "Password reset successfully. Please sign in with your new password."
    case "CheckEmailInbox":
      return "Check your email inbox for the reset link."
    default:
      return null
  }
}

export function LoginForm({
  className,
  error,
  message,
  ...props
}: LoginFormProps) {
  const errorMessage = getErrorMessage(error)
  const successMessage = getSuccessMessage(message)

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}
              action={async (formData) => {
            "use server"
            try {
              const submitData = Object.fromEntries(formData);
              await signIn("credentials", { ...submitData, redirectTo: "/dashboard" })
            } catch (error) {
              if (error instanceof AuthError) {
                // Check for banned user error code
                if ((error as any).code === "BannedUser") {
                  redirect("/sign-in?error=BannedUser")
                }
                if (error.type === "CredentialsSignin") {
                   redirect("/sign-in?error=InvalidCredentials")
                }
              }
              // Always rethrow so Next.js successful redirects (NEXT_REDIRECT) are handled
              throw error
            }
        }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 text-sm text-green-500 bg-green-500/10 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required className="border-1 border-dzignex-white/35 " />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="/forget-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" placeholder="*********************" required  className="border-1 border-dzignex-white/35"/>
        </Field>
        <Field>
          <Button type="submit" className="bg-dzignex-white/90 text-dzignex-black hover:bg-dzignex-white/85">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

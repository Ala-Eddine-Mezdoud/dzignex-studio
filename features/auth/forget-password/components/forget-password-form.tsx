"use client"

import { cn } from "../../../../lib/utils"
import { Button } from "../../../../components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../../../components/ui/field"
import { Input } from "../../../../components/ui/input"
import Link from "next/link"
import { forgotPasswordAction } from "../../../../db-actions/forgot-password"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-dzignex-white/90 text-dzignex-black hover:bg-dzignex-white/85 w-full"
    >
      {pending ? "Sending..." : "Send Reset Link"}
    </Button>
  )
}

interface ForgetPasswordFormProps extends React.ComponentProps<"form"> {
  error?: string
}

const getErrorMessage = (errorCode: string | undefined) => {
  switch (errorCode) {
    case "MissingEmail":
      return "Please enter your email address"
    case "AccountNotFound":
      return "This account does not exist"
    case "NoPasswordSet":
      return "This account cannot reset password. Please use magic link login."
    default:
      return null
  }
}

export function ForgetPasswordForm({
  className,
  error,
  ...props
}: ForgetPasswordFormProps) {
  const errorMessage = getErrorMessage(error)

  return (
    <form action={forgotPasswordAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below and we'll send you a reset link
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required className="border-1 border-dzignex-white/35" />
        </Field>
        <Field>
          <div className="flex items-center">
            <Link
              href="/sign-in"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </Field>
        <Field>
          <SubmitButton />
        </Field>
      </FieldGroup>
    </form>
  )
}

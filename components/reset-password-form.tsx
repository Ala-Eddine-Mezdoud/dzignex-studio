"use client"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import Link from "next/link"
import { resetPasswordAction } from "../db-actions/reset-password"
import { useFormStatus } from "react-dom"

interface ResetPasswordFormProps extends React.ComponentProps<"form"> {
  token: string
  email: string
  error?: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="bg-dzignex-white/90 text-dzignex-black hover:bg-dzignex-white/85 w-full"
    >
      {pending ? "Resetting..." : "Reset Password"}
    </Button>
  )
}

export function ResetPasswordForm({
  className,
  token,
  email,
  error,
  ...props
}: ResetPasswordFormProps) {
  const getErrorMessage = (errorCode: string | undefined) => {
    switch (errorCode) {
      case "MissingFields":
        return "Please fill in all fields"
      case "PasswordsDoNotMatch":
        return "Passwords do not match"
      case "PasswordTooShort":
        return "Password must be at least 8 characters"
      case "InvalidOrExpiredToken":
        return "Reset link is invalid or has expired"
      default:
        return null
    }
  }

  const errorMessage = getErrorMessage(error)

  return (
    <form
      action={resetPasswordAction}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />
      
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="*********************" 
            required 
            minLength={8}
            className="border-1 border-dzignex-white/35" 
          />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            placeholder="*********************" 
            required 
            minLength={8}
            className="border-1 border-dzignex-white/35" 
          />
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

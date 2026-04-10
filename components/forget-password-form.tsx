import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import Link from "next/link"
export function ForgetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forget Password</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to reset your password
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required className="border-1 border-dzignex-white/35 " />
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
          <Button type="submit" className="bg-dzignex-white/90 text-dzignex-black hover:bg-dzignex-white/85">Send Reset Link</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

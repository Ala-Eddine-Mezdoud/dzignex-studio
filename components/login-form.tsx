import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field"
import { Input } from "../components/ui/input"
import Link from "next/link"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required className="border-1 border-dzignex-white/35 " />
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
          <Input id="password" type="password" placeholder="*********************" required  className="border-1 border-dzignex-white/35"/>
        </Field>
        <Field>
          <Button type="submit" className="bg-dzignex-white/90 text-dzignex-black hover:bg-dzignex-white/85">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

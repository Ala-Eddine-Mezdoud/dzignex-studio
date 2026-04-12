"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Suppress the script tag warning from next-themes
const originalConsoleError = console.error
console.error = (...args: any[]) => {
  if (typeof args[0] === "string" && args[0].includes("script tag")) {
    return
  }
  originalConsoleError.apply(console, args)
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}

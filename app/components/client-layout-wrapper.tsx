"use client"

import { ThemeProvider } from "../contexts/theme-context"
import { PortfolioProvider } from "../contexts/portfolio-context"
import type React from "react"

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PortfolioProvider>{children}</PortfolioProvider>
    </ThemeProvider>
  )
}

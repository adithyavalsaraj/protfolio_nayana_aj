"use client"

import { usePortfolio } from "../../contexts/portfolio-context"

export function Footer() {
  const { data } = usePortfolio()

  return (
    <footer
      className="relative py-6 sm:py-8 z-10 border-t px-4 sm:px-6"
      style={{ borderColor: "var(--theme-card-border)" }}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base" style={{ color: "var(--theme-text-secondary)" }}>
          © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

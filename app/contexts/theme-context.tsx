"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { Theme } from "../types/theme"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  isThemeLoaded: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

  // Initialize theme from localStorage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme") as Theme | null
      if (storedTheme) {
        setTheme(storedTheme)
      } else {
        // Check user system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setTheme(prefersDark ? "dark" : "light")
      }
    } catch (error) {
      // Fallback to dark theme if localStorage is not available
      setTheme("dark")
    }
    setIsThemeLoaded(true)
  }, [])

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (isThemeLoaded) {
      try {
        localStorage.setItem("theme", theme)
      } catch (error) {
        // Handle localStorage errors gracefully
        console.warn("Could not save theme to localStorage:", error)
      }

      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("light-theme", "dark-theme")
        document.documentElement.classList.add(`${theme}-theme`)
      }
    }
  }, [theme, isThemeLoaded])

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, isThemeLoaded }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

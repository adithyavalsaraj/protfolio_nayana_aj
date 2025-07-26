"use client"

import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "../contexts/theme-context"

export function ThemeSwitch() {
  const { theme, toggleTheme, isThemeLoaded } = useTheme()

  if (!isThemeLoaded) {
    return <div className="w-10 h-10"></div> // Placeholder while loading
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        theme === "dark"
          ? "bg-blue-950/30 hover:bg-blue-900/40 text-yellow-300"
          : "bg-blue-100 hover:bg-blue-200 text-blue-600"
      } transition-all duration-300`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {theme === "dark" ? (
        <motion.div initial={{ rotate: -45 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
          <Sun className="w-5 h-5" />
        </motion.div>
      ) : (
        <motion.div initial={{ rotate: 45 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
          <Moon className="w-5 h-5" />
        </motion.div>
      )}
    </motion.button>
  )
}

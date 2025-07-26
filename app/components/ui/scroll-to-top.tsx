"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"
import { useTheme } from "../../contexts/theme-context"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: theme === "dark" ? "rgba(147, 51, 234, 0.9)" : "rgba(59, 130, 246, 0.9)",
            borderColor: theme === "dark" ? "rgba(147, 51, 234, 0.3)" : "rgba(59, 130, 246, 0.3)",
            color: "white",
          }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

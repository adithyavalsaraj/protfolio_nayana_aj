"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { SpaceBackground } from "./components/space-background"
import { Navigation } from "./components/navigation/navigation"
import { HeroSection } from "./components/sections/hero/hero-section"
import { PublicationsSection } from "./components/sections/publications/publications-section"
import { ResearchSection } from "./components/sections/research/research-section"
import { CVSection } from "./components/sections/cv/cv-section"
import { ContactSection } from "./components/sections/contact/contact-section"
import { Footer } from "./components/layout/footer"
import { ScrollToTop } from "./components/ui/scroll-to-top"
import { useTheme } from "./contexts/theme-context"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const searchParams = useSearchParams()
  const scrolledRef = useRef(false)

  // Use the proper theme context
  const { theme, toggleTheme } = useTheme()

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "publications", "research", "cv", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Effect to scroll to section based on URL query parameter
  useEffect(() => {
    const sectionParam = searchParams.get("section")
    if (sectionParam && !scrolledRef.current) {
      const element = document.getElementById(sectionParam)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        scrolledRef.current = true

        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete("section")
        window.history.replaceState({}, "", newUrl.toString())
      }
    } else if (!sectionParam) {
      scrolledRef.current = false
    }
  }, [searchParams])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div
      className="min-h-screen text-theme-text-primary overflow-x-hidden relative"
      style={{ backgroundColor: "var(--theme-bg)" }}
    >
      <SpaceBackground />

      <Navigation
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <HeroSection scrollToSection={scrollToSection} />

      <PublicationsSection isMobile={isMobile} theme={theme} />

      <ResearchSection />

      <CVSection />

      <ContactSection theme={theme} />

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

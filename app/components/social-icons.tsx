"use client"

import { Github, Twitter, Globe } from "lucide-react"

// Custom LinkedIn icon
export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// Custom ORCID icon (official green color and design)
export function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.525.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-1.016 5.016-5.344 5.016h-3.9V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.9-1.303 3.9-3.722 0-2.297-1.541-3.722-3.9-3.722h-2.297z" />
    </svg>
  )
}

// Custom Google Scholar icon
export function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  )
}

// Custom ResearchGate icon
export function ResearchGateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.586 0H4.414A4.414 4.414 0 0 0 0 4.414v15.172A4.414 4.414 0 0 0 4.414 24h15.172A4.414 4.414 0 0 0 24 19.586V4.414A4.414 4.414 0 0 0 19.586 0zM8.063 18.411H6.031V9.588h2.032v8.823zm-1.016-10.035a1.176 1.176 0 1 1 0-2.352 1.176 1.176 0 0 1 0 2.352zm10.035 10.035h-2.032v-4.294c0-.758-.015-1.734-1.057-1.734-1.058 0-1.22.826-1.22 1.679v4.349H10.74V9.588h1.95v1.206h.027c.271-.514.935-1.057 1.925-1.057 2.058 0 2.44 1.355 2.44 3.117v5.557z" />
    </svg>
  )
}

// Helper function to get the appropriate social icon
export function getSocialIcon(url: string) {
  // Ensure url is a string before calling string methods
  if (typeof url !== "string") {
    return Globe // Default icon if URL is not a string
  }

  if (url.includes("github.com")) return Github
  if (url.includes("linkedin.com")) return LinkedinIcon
  if (url.includes("twitter.com") || url.includes("x.com")) return Twitter
  if (url.includes("orcid.org")) return OrcidIcon
  if (url.includes("researchgate.net")) return ResearchGateIcon
  if (url.includes("scholar.google.com")) return GoogleScholarIcon
  return Globe // Default for other websites
}

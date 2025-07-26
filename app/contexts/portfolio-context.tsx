"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { portfolioData, generateSlug } from "../data"

export interface PortfolioData {
  personal: {
    name: string
    title: string
    email: string[]
    location: string
    bio: string
    bioSub: string
    profileImage: string
    social: Array<{
      id: string
      title: string
      url: string
    }>
  }
  statistics: {
    leadAuthorPapers: number
    totalCitations: number
    hIndex: number
  }
  research: Array<{
    id: string
    title: string
    description: string
    image: string
  }>
  publications: Array<{
    id: string
    title: string
    authors: string
    journal: string
    year: number
    date?: string
    doi: string
    citations?: number
    type: string
    fileData?: string
    fileType?: string
    adsUrl?: string
  }>
  experience: Array<{
    id: string
    position: string
    institution: string
    period: string
  }>
}

interface PortfolioContextType {
  data: PortfolioData
  generateSlug: (title: string) => string
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data] = useState<PortfolioData>(portfolioData)

  return <PortfolioContext.Provider value={{ data, generateSlug }}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}

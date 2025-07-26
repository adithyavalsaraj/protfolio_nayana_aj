// Central data export - single source of truth
import { personalData } from "./personal-data"
import { statisticsData } from "./statistics-data"
import { researchData } from "./research-data"
import { experienceData } from "./experience-data"
import { publicationsData } from "./publications-data"

// Helper function to generate URL-friendly slug (client-side version)
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/^-+|-+$/g, "") // Trim hyphens from start/end
}

// Combined data structure for easy access
export const portfolioData = {
  personal: personalData,
  statistics: statisticsData,
  research: researchData,
  publications: publicationsData,
  experience: experienceData,
}

// Central data export - single source of truth
import { experienceData } from "./experience-data";
import { personalData } from "./personal-data";
import { publicationsData } from "./publications-data";
import { researchData } from "./research-data";

// Helper function to generate URL-friendly slug (client-side version)
export function generateSlug(title?: string): string {
  // Handle missing, null, or non-string titles gracefully
  const safeTitle = title?.toString().toLowerCase() || "untitled";

  return safeTitle
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start/end
}

// Combined data structure for easy access
export const portfolioData = {
  personal: personalData,
  research: researchData,
  publications: publicationsData,
  experience: experienceData,
};

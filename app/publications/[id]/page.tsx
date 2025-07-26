import PublicationDetailPageClient from "./PublicationDetailPageClient"
import { publicationsData } from "../../data/publications-data"

// Helper function to generate URL-friendly slug (server-side only)
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/^-+|-+$/g, "") // Trim hyphens from start/end
}

// Generate static params for all publications - server-side only
export async function generateStaticParams() {
  return publicationsData.map((publication) => ({
    id: generateSlug(publication.title),
  }))
}

// Generate metadata for each publication page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const publication = publicationsData.find((p) => generateSlug(p.title) === params.id)

  if (!publication) {
    return {
      title: "Publication Not Found",
      description: "The requested publication could not be found.",
    }
  }

  return {
    title: `${publication.title} | Dr. Nayana AJ`,
    description: `${publication.title} by ${publication.authors}. Published in ${publication.journal}, ${publication.year}.`,
    keywords: [
      publication.title,
      publication.authors,
      publication.journal,
      "astrophysics",
      "research paper",
      "publication",
      publication.type,
    ],
    openGraph: {
      title: publication.title,
      description: `${publication.title} by ${publication.authors}. Published in ${publication.journal}, ${publication.year}.`,
      type: "article",
      publishedTime: publication.date || `${publication.year}-01-01`,
      authors: [publication.authors],
      section: "Science",
    },
    twitter: {
      card: "summary",
      title: publication.title,
      description: `Published in ${publication.journal}, ${publication.year}`,
    },
  }
}

export default function PublicationDetailPage() {
  return <PublicationDetailPageClient />
}

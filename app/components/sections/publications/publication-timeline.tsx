"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sortPublicationsByDate } from "@/lib/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { usePortfolio } from "../../../contexts/portfolio-context";
import { DetailModal } from "../../ui/DetailModal";
import { PublicationItem } from "./publication-timeline-item";

interface PublicationTimelineProps {
  filteredPublications: any[];
  isMobile: boolean;
  theme: string;
}

export function PublicationTimeline({
  filteredPublications,
  isMobile,
  theme,
}: PublicationTimelineProps) {
  const { generateSlug } = usePortfolio();

  const [selectedPublication, setSelectedPublication] = useState<any | null>(
    null
  );

  const { sortedPublications, groupedByYear } = useMemo(() => {
    const sorted = sortPublicationsByDate(filteredPublications);
    const grouped = sorted.reduce((acc: Record<number, any[]>, pub) => {
      const year = pub.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    }, {});
    return { sortedPublications: sorted, groupedByYear: grouped };
  }, [filteredPublications]);

  // Highlight author
  const highlightAuthorName = useMemo(() => {
    return (authors?: string) => {
      if (!authors) return "";
      const variations = [
        "Nayana, A. J.",
        "Nayana A. J.",
        "Nayana A.J.",
        "Nayana AJ",
        "A. J. Nayana",
        "A J Nayana",
        "AJ Nayana",
        "Nayana A.J",
      ];
      let updated = authors;
      variations.forEach((v) => {
        const regex = new RegExp(
          v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "gi"
        );
        updated = updated.replace(
          regex,
          `<span class='author-highlight'>${v}</span>`
        );
      });
      return updated;
    };
  }, []);

  if (!sortedPublications.length)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-lg" style={{ color: "var(--theme-text-secondary)" }}>
          No publications found
        </p>
      </motion.div>
    );

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div
      className={`relative ${
        isMobile ? "max-w-2xl" : "max-w-5xl"
      } mx-auto px-4 sm:px-6`}
    >
      <style jsx global>{`
        .author-highlight {
          color: var(--theme-highlight-color);
          font-weight: 700;
          font-size: 1.2em;
        }
      `}</style>

      {/* Vertical central line */}
      {!isMobile && (
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--theme-highlight-color)] opacity-70"
          aria-hidden="true"
        />
      )}

      {/* Year Sections */}
      {years.map((year, yearIdx) => {
        const publications = groupedByYear[year];
        return (
          <section key={year} className="relative w-full">
            {/* Year Marker */}
            <motion.div
              className="flex items-center justify-center my-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: yearIdx * 0.05 }}
              viewport={{ once: true }}
            >
              <div
                className="px-4 py-2 rounded-full border-2 font-semibold text-sm shadow-md backdrop-blur-sm"
                style={{
                  borderColor: "var(--theme-highlight-color)",
                  color: "var(--theme-highlight-color)",
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(0,0,0,0.6)"
                      : "rgba(255,255,255,0.9)",
                }}
              >
                {year} &nbsp;•&nbsp; {publications.length}{" "}
                {publications.length > 1 ? "publications" : "publication"}
              </div>
            </motion.div>

            {/* Publications of that year */}
            {publications.map((pub, idx) => (
              <PublicationItem
                key={pub.id || idx}
                publication={pub}
                index={idx}
                isLeft={!isMobile && idx % 2 === 0}
                isMobile={isMobile}
                theme={theme}
                highlightAuthorName={highlightAuthorName}
                generateSlug={generateSlug}
                onSelect={() => setSelectedPublication(pub)}
              />
            ))}
          </section>
        );
      })}
      <DetailModal
        open={!!selectedPublication}
        onClose={() => setSelectedPublication(null)}
        image={selectedPublication?.image}
        title={selectedPublication?.title}
        actionButtons={
          selectedPublication && (
            <div className="w-full flex flex-row flex-wrap justify-between items-center gap-y-2 gap-x-4">
              <div className="flex flex-row flex-wrap gap-2 h-fit">
                {(selectedPublication.date || selectedPublication.year) && (
                  <Badge
                    className="text-xs font-semibold px-2 py-1"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.2)"
                          : "rgba(59, 130, 246, 0.2)",
                      color: "var(--theme-highlight-color)",
                      border: `1px solid ${
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.4)"
                          : "rgba(59, 130, 246, 0.4)"
                      }`,
                    }}
                  >
                    {selectedPublication.date || selectedPublication.year}
                  </Badge>
                )}

                {selectedPublication?.type && (
                  <Badge className="theme-badge text-xs sm:text-sm">
                    {selectedPublication.type}
                  </Badge>
                )}
              </div>

              <div className="flex flex-row flex-wrap gap-2">
                {selectedPublication?.adsUrl && (
                  <Button
                    onClick={() =>
                      window.open(selectedPublication.adsUrl, "_blank")
                    }
                    className="theme-button-primary text-white flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4 flex-shrink-0" />
                    <span>View on NASA ADS</span>
                  </Button>
                )}
                {selectedPublication?.doi && (
                  <Button
                    onClick={() =>
                      window.open(
                        `https://doi.org/${selectedPublication.doi}`,
                        "_blank"
                      )
                    }
                    className="theme-button-primary text-white flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    <span>DOI: {selectedPublication.doi}</span>
                  </Button>
                )}
              </div>
            </div>
          )
        }
      >
        {selectedPublication && (
          <div className="space-y-4">
            {selectedPublication.authors && (
              <div
                className="authors-text text-xs"
                style={{ color: "var(--theme-text-secondary)" }}
                dangerouslySetInnerHTML={{
                  __html: highlightAuthorName(selectedPublication.authors),
                }}
              />
            )}
            {selectedPublication.journal && (
              <Badge
                className={clsx(
                  "text-xs font-semibold border-2 backdrop-blur-md shadow-md theme-highlight !bg-transparent",
                  theme === "dark"
                    ? "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(147,51,234,0.2)]"
                    : "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                )}
              >
                {selectedPublication.journal}
              </Badge>
            )}
          </div>
        )}
      </DetailModal>
    </div>
  );
}

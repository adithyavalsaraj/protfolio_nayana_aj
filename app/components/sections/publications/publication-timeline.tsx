"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sortPublicationsByDate } from "@/lib/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { usePortfolio } from "../../../contexts/portfolio-context";

interface PublicationTimelineProps {
  filteredPublications: any[];
  isMobile: boolean;
  theme: string;
}

interface PublicationItemProps {
  publication: any;
  index: number;
  isLeft: boolean;
  isMobile: boolean;
  theme: string;
  highlightAuthorName: (authors: string) => string;
  generateSlug: (title: string) => string;
}

function PublicationItem({
  publication,
  index,
  isLeft,
  isMobile,
  theme,
  highlightAuthorName,
  generateSlug,
}: PublicationItemProps) {
  return (
    <motion.div
      className={clsx(
        "relative flex w-full mb-12 sm:mb-16",
        isMobile ? "flex-row" : isLeft ? "justify-end" : "justify-start"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      viewport={{ once: true }}
    >
      {/* Connecting line */}
      {/* {!isMobile && (
        <div
          className={clsx(
            "absolute top-8 w-full h-0.5",
            "left-1/2 -translate-x-1/2",
            "bg-[var(--theme-highlight-color)]"
          )}
        />
      )} */}

      {/* Node */}
      <div
        className={clsx(
          "absolute rounded-full w-4 h-4 border-4 border-white shadow-md",
          "bg-[var(--theme-highlight-color)]",
          "top-6 left-1/2 -translate-x-1/2 z-10",
          isMobile ? "hidden" : "block"
        )}
      />

      {/* Card */}
      <div
        className={clsx(
          "relative max-w-[90%]",
          isMobile
            ? "ml-12"
            : isLeft
            ? "mr-[calc(50%+30px)] text-right sm:max-w-[45%]"
            : "ml-[calc(50%+30px)] text-left sm:max-w-[45%]"
        )}
      >
        <Card className="theme-card border shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className={clsx(isMobile ? "p-3" : "p-4")}>
            <div className="space-y-3">
              {/* Date + Type */}
              <div className="flex flex-wrap justify-between items-start gap-2">
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
                  {publication.date || publication.year}
                </Badge>
                <Badge className="theme-badge text-xs flex-shrink-0">
                  {publication.type}
                </Badge>
              </div>

              {/* Title */}
              <Link
                href={`/publications/${generateSlug(publication.title)}`}
                className="block group"
              >
                <h3 className="text-sm font-semibold theme-highlight group-hover:underline leading-snug">
                  {publication.title}
                </h3>
              </Link>

              {/* Authors */}
              <div
                className="authors-text text-xs"
                style={{ color: "var(--theme-text-secondary)" }}
                dangerouslySetInnerHTML={{
                  __html: highlightAuthorName(publication.authors),
                }}
              />

              {/* Journal */}
              <Badge
                className={clsx(
                  "text-xs font-semibold border-2 backdrop-blur-md shadow-md theme-highlight !bg-transparent",
                  theme === "dark"
                    ? "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(147,51,234,0.2)]"
                    : "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                )}
              >
                {publication.journal} 136
              </Badge>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-1 pt-1">
                {publication.adsUrl && (
                  <Button
                    onClick={() => window.open(publication.adsUrl, "_blank")}
                    variant="ghost"
                    size="sm"
                    className="text-xs px-2 py-1 h-auto theme-highlight flex items-center gap-1"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.1)"
                          : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <Eye className="w-3 h-3" />
                    ADS
                  </Button>
                )}
                {publication.doi && (
                  <Button
                    onClick={() =>
                      window.open(
                        `https://doi.org/${publication.doi}`,
                        "_blank"
                      )
                    }
                    variant="ghost"
                    size="sm"
                    className="text-xs px-2 py-1 h-auto theme-highlight flex items-center gap-1"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.1)"
                          : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    DOI
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

export function PublicationTimeline({
  filteredPublications,
  isMobile,
  theme,
}: PublicationTimelineProps) {
  const { generateSlug } = usePortfolio();

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
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

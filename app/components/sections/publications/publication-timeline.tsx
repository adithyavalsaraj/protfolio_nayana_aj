"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { usePortfolio } from "../../../contexts/portfolio-context";

interface PublicationTimelineProps {
  filteredPublications: any[];
  isMobile: boolean;
  theme: string;
}

interface PublicationItemProps {
  publication: any;
  index: number;
  isMobile: boolean;
  theme: string;
  isLeft: boolean;
  highlightAuthorName: (authors: string) => string;
  generateSlug: (title: string) => string;
}

function PublicationItem({
  publication,
  index,
  isMobile,
  theme,
  isLeft,
  highlightAuthorName,
  generateSlug,
}: PublicationItemProps) {
  return (
    <div className="relative mb-16 sm:mb-20">
      {/* Timeline Node */}
      <motion.div
        className={`absolute z-20 ${
          isMobile
            ? "left-8 transform -translate-x-1/2"
            : "left-1/2 transform -translate-x-1/2"
        }`}
        style={{ top: "60px" }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.02 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div
          className="w-4 h-4 rounded-full border-4 border-white shadow-lg"
          style={{
            backgroundColor: "var(--theme-highlight-color)",
          }}
        />
      </motion.div>

      {/* Connecting Line */}
      <motion.div
        className="absolute z-10"
        style={{
          top: "68px",
          left: isMobile
            ? "calc(2rem + 2px)"
            : isLeft
            ? "calc(50% - 60px)"
            : "calc(50% + 2px)",
          width: "60px",
          height: "2px",
          backgroundColor: "var(--theme-highlight-color)",
        }}
        initial={{ width: 0 }}
        whileInView={{ width: "60px" }}
        transition={{ duration: 0.3, delay: index * 0.02 }}
        viewport={{ once: true, margin: "-50px" }}
      />

      {/* Publication Card */}
      <motion.div
        className="absolute z-10"
        style={{
          top: "0px",
          left: isMobile
            ? "calc(2rem + 40px)"
            : isLeft
            ? "0%"
            : "calc(50% + 60px)",
          width: isMobile
            ? "calc(100% - 2rem - 60px)"
            : isLeft
            ? "calc(50% - 60px)"
            : "calc(50% - 60px)",
        }}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.02 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <Card className="theme-card shadow-lg hover:shadow-xl transition-all duration-300 border">
          <CardContent className={`${isMobile ? "p-3" : "p-4"}`}>
            <div className="space-y-3">
              {/* Date Badge and Type */}
              <div className="flex flex-wrap justify-between items-start gap-2">
                <Badge
                  className="text-xs font-semibold px-2 py-1 flex-shrink-0"
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

              {/* Publication Title */}
              <div>
                <Link
                  href={`/publications/${generateSlug(publication.title)}`}
                  className="block group"
                >
                  <h3 className="text-sm font-semibold leading-tight theme-highlight group-hover:underline transition-colors duration-200 cursor-pointer">
                    {publication.title}
                  </h3>
                </Link>
              </div>

              {/* Authors with highlighting */}
              <div
                className="authors-text text-xs"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlightAuthorName(publication.authors),
                  }}
                />
              </div>

              {/* Journal */}
              <div className="flex items-center">
                <Badge
                  className={clsx(
                    "journal-badge border-2 backdrop-blur-md shadow-md text-xs font-semibold px-2 py-1 theme-highlight !bg-transparent",
                    theme === "dark"
                      ? "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(147,51,234,0.2)] !bg-[linear-gradient(135deg,rgba(147,51,234,0.1),rgba(168,85,247,0.1))]"
                      : "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(59,130,246,0.2)] !bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(99,102,241,0.1))]"
                  )}
                >
                  {publication.journal}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-1 pt-1">
                {publication.adsUrl && (
                  <Button
                    onClick={() => window.open(publication.adsUrl, "_blank")}
                    variant="ghost"
                    size="sm"
                    className="text-xs px-2 py-1 h-auto theme-highlight hover:bg-opacity-10 transition-all duration-200 flex items-center gap-1"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.1)"
                          : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <Eye className="w-3 h-3 flex-shrink-0" />
                    <span>ADS</span>
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
                    className="text-xs px-2 py-1 h-auto theme-highlight hover:bg-opacity-10 transition-all duration-200 flex items-center gap-1"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.1)"
                          : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    <span>DOI</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export function PublicationTimeline({
  filteredPublications,
  isMobile,
  theme,
}: PublicationTimelineProps) {
  const { generateSlug } = usePortfolio();
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, {
    once: true,
    margin: "-50px",
  });

  // Memoize sorted publications and year markers
  const { sortedPublications, yearMarkers } = useMemo(() => {
    const sorted = filteredPublications.sort((a, b) => b.year - a.year);

    // Calculate year markers with proper spacing
    const markers = sorted.reduce((acc, publication, index) => {
      const year = publication.year;
      if (!acc.find((marker: any) => marker.year === year)) {
        acc.push({
          year,
          position: index * (isMobile ? 320 : 320) + 80, // Fixed spacing to prevent overlaps
          publicationCount: sorted.filter((p) => p.year === year).length,
        });
      }
      return acc;
    }, [] as Array<{ year: number; position: number; publicationCount: number }>);

    return { sortedPublications: sorted, yearMarkers: markers };
  }, [filteredPublications, isMobile]);

  // Memoize author highlighting function
  const highlightAuthorName = useMemo(() => {
    return (authors: string) => {
      const nameVariations = [
        "Nayana, A. J.",
        "Nayana A. J.",
        "Nayana A.J.",
        "Nayana AJ",
        "Nayana A J",
        "A. J. Nayana",
        "A J Nayana",
        "AJ Nayana",
      ];

      let highlightedAuthors = authors;

      nameVariations.forEach((variation) => {
        const escapedVariation = variation.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        const regex = new RegExp(
          `(^|[^a-zA-Z])${escapedVariation}([^a-zA-Z]|$)`,
          "gi"
        );

        highlightedAuthors = highlightedAuthors.replace(
          regex,
          (match, before, after) => {
            const nameMatch = match.substring(
              before.length,
              match.length - after.length
            );
            return `${before}<span class="author-highlight">${nameMatch}</span>${after}`;
          }
        );
      });

      return highlightedAuthors;
    };
  }, []);

  if (sortedPublications.length === 0) {
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
  }

  const totalHeight = sortedPublications.length * 320 + 160;

  return (
    <div
      className={`relative ${isMobile ? "max-w-2xl" : "max-w-4xl"} mx-auto`}
      ref={timelineRef}
    >
      {/* Optimized CSS for better performance */}
      <style jsx>{`
        .author-highlight {
          color: var(--theme-highlight-color) !important;
          font-weight: 700 !important;
          background: ${theme === "dark"
            ? "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(168, 85, 247, 0.2))"
            : "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2))"} !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          border: 1px solid
            ${theme === "dark"
              ? "rgba(147, 51, 234, 0.4)"
              : "rgba(59, 130, 246, 0.4)"} !important;
          box-shadow: 0 1px 3px
            ${theme === "dark"
              ? "rgba(147, 51, 234, 0.2)"
              : "rgba(59, 130, 246, 0.2)"} !important;
          text-shadow: none !important;
          white-space: nowrap !important;
        }

        .authors-text {
          line-height: 1.6 !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
          margin: 0.5rem 0 !important;
        }

        .journal-badge {
          border: 2px solid var(--theme-highlight-color) !important;
          background: ${theme === "dark"
            ? "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(168, 85, 247, 0.1))"
            : "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))"} !important;
          backdrop-filter: blur(8px) !important;
          box-shadow: 0 2px 8px
            ${theme === "dark"
              ? "rgba(147, 51, 234, 0.2)"
              : "rgba(59, 130, 246, 0.2)"} !important;
        }
      `}</style>

      <div className="relative" style={{ minHeight: `${totalHeight}px` }}>
        {/* Central Timeline Line */}
        <motion.div
          className={`absolute top-0 w-0.5 z-0 ${
            isMobile
              ? "left-8 ml-2"
              : "left-1/2 transform -translate-x-1/2 ml-2"
          }`}
          style={{
            backgroundColor: "var(--theme-highlight-color)",
            height: `${totalHeight}px`,
          }}
          initial={{ height: 0 }}
          animate={
            isTimelineInView ? { height: `${totalHeight}px` } : { height: 0 }
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Year Markers - Back to original positioning */}
        {yearMarkers.map((marker: any, index: number) => (
          <motion.div
            key={`year-marker-${marker.year}`}
            className="absolute z-15"
            style={{
              top: `${marker.position - 80}px`,
              left: isMobile ? "0px" : "calc(50% - 30px)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {isMobile ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  className="h-px bg-gradient-to-r"
                  style={{
                    width: "20px",
                    background:
                      "linear-gradient(to right, var(--theme-highlight-color), transparent)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "20px" }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  viewport={{ once: true }}
                />
                <div
                  className="text-sm font-semibold px-2 py-1 rounded-md backdrop-blur-sm border order-last"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.4)"
                        : "rgba(255, 255, 255, 0.8)",
                    borderColor: "var(--theme-card-border)",
                    color: "var(--theme-highlight-color)",
                  }}
                >
                  {marker.year}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div
                  className="text-sm font-semibold px-3 py-2 rounded-full backdrop-blur-sm border shadow-lg"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(0, 0, 0, 0.6)"
                        : "rgba(255, 255, 255, 0.9)",
                    borderColor: "var(--theme-highlight-color)",
                    color: "var(--theme-highlight-color)",
                    border: `2px solid var(--theme-highlight-color)`,
                  }}
                >
                  {marker.year}
                </div>
              </div>
            )}

            <div
              className={`text-xs mt-1 rounded-sm p-0.5 ${
                isMobile ? "text-left ml-5" : "text-center"
              }`}
              style={{
                color: "var(--theme-text-secondary)",
                marginLeft: isMobile ? "20px" : "40px",
                backgroundColor:
                  theme === "dark"
                    ? "rgba(147, 51, 234, 0.1)"
                    : "rgba(59, 130, 246, 0.1)",
              }}
            >
              {marker.publicationCount} pub
              {marker.publicationCount !== 1 ? "s" : ""}
            </div>
          </motion.div>
        ))}

        {/* Timeline Items - Back to original design with fixed spacing */}
        {sortedPublications.map((publication, index) => {
          const isLeft = !isMobile && index % 2 === 0;

          return (
            <div
              key={publication.id}
              className="absolute w-full"
              style={{
                top: `${80 + index * 320}px`, // Fixed spacing of 320px between items
              }}
            >
              <PublicationItem
                publication={publication}
                index={index}
                isMobile={isMobile}
                theme={theme}
                isLeft={isLeft}
                highlightAuthorName={highlightAuthorName}
                generateSlug={generateSlug}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

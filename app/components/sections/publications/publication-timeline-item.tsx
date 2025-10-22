"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPubDate } from "@/lib/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ExternalLink, Eye } from "lucide-react";

interface PublicationItemProps {
  publication: any;
  index: number;
  isLeft?: boolean;
  isMobile?: boolean;
  theme: string;
  highlightAuthorName: (authors: string) => string;
  generateSlug: (title: string) => string;
  onSelect: () => void;
}

export function PublicationItem({
  publication,
  index,
  isLeft,
  isMobile,
  theme,
  highlightAuthorName,
  onSelect,
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
        <Card className="theme-card border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1">
          <CardContent
            className={clsx(isMobile ? "p-3" : "p-4")}
            onClick={onSelect}
          >
            <div className="space-y-3">
              {/* Date + Type */}
              <div className="flex flex-wrap justify-between items-start gap-2">
                {(publication.date ||
                  publication.pubdate ||
                  publication.year) && (
                  <Badge
                    className="text-xs font-semibold px-2 py-1 text-[var(--theme-highlight-color)]"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.2)"
                          : "rgba(59, 130, 246, 0.2)",
                      border: `1px solid ${
                        theme === "dark"
                          ? "rgba(147, 51, 234, 0.4)"
                          : "rgba(59, 130, 246, 0.4)"
                      }`,
                    }}
                  >
                    {formatPubDate(publication.date || publication.pubdate) ||
                      publication.year}
                  </Badge>
                )}

                {publication.citations !== undefined && (
                  <Badge className="theme-badge text-xs flex-shrink-0">
                    Citations: {publication.citations}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold theme-highlight leading-snug hover:underline">
                {publication.title}
              </h3>

              {/* Authors */}
              {publication.authors && (
                <div
                  className="authors-text text-xs text-[var(--theme-text-secondary)]"
                  dangerouslySetInnerHTML={{
                    __html: highlightAuthorName(publication.authors),
                  }}
                />
              )}

              {/* Journal */}
              {publication.journal && (
                <Badge
                  className={clsx(
                    "text-xs font-semibold border-2 backdrop-blur-md shadow-md theme-highlight !bg-transparent",
                    theme === "dark"
                      ? "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(147,51,234,0.2)]"
                      : "border-[var(--theme-highlight-color)] shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  )}
                >
                  {publication.journal}
                </Badge>
              )}

              {/* Action Buttons */}
              {(publication.adsUrl || publication.doi) && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {publication.adsUrl && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(publication.adsUrl, "_blank");
                      }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `https://doi.org/${publication.doi}`,
                          "_blank"
                        );
                      }}
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
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

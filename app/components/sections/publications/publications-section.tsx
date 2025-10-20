"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { usePortfolio } from "../../../contexts/portfolio-context";
import { PublicationStatistics } from "./publication-statistics";
import { PublicationTimeline } from "./publication-timeline";

interface PublicationsSectionProps {
  isMobile: boolean;
  theme: string;
}

export function PublicationsSection({
  isMobile,
  theme,
}: PublicationsSectionProps) {
  const { data } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");
  const [authorRole, setAuthorRole] = useState<
    "All" | "Lead" | "Second" | "CoAuthor"
  >("All");

  const query = searchQuery.toLowerCase();

  // Filter logic based on stored authorRole in data
  const filteredPublications = useMemo(() => {
    return (data?.publications || []).filter((publication) => {
      const title = publication?.title?.toLowerCase() || "";
      const authors = publication?.authors?.toLowerCase() || "";
      const journal = publication?.journal?.toLowerCase() || "";
      const type = publication?.type?.toLowerCase() || "";
      const year = publication?.year?.toString() || "";

      // Use the explicit authorRole field in dataset
      const role = publication?.authorRole || "CoAuthor";
      const roleMatch = authorRole === "All" ? true : role === authorRole;

      const searchMatch =
        !query ||
        title.includes(query) ||
        authors.includes(query) ||
        journal.includes(query) ||
        type.includes(query) ||
        year.includes(query);

      return roleMatch && searchMatch;
    });
  }, [data?.publications, query, authorRole]);

  return (
    <section
      id="publications"
      className="relative py-16 sm:py-20 z-10 px-4 sm:px-6"
      style={{
        backgroundColor:
          theme === "dark" ? "rgba(0,0,0,0.1)" : "rgba(59,130,246,0.05)",
      }}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 theme-gradient-text">
            Publications
          </h2>

          <PublicationStatistics />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {["All", "Lead", "Second", "CoAuthor"].map((role) => (
              <Button
                key={role}
                onClick={() => setAuthorRole(role as any)}
                variant={authorRole === role ? "default" : "outline"}
                className={`text-sm px-4 py-1.5 font-medium transition-all duration-200 ${
                  authorRole === role
                    ? "theme-button-secondary"
                    : "hover:scale-105"
                }`}
              >
                {role === "All"
                  ? "All Publications"
                  : role === "CoAuthor"
                  ? "Co-Author"
                  : `${role} Author`}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: "var(--theme-text-secondary)" }}
              />
              <Input
                type="text"
                placeholder={`Search within ${authorRole.toLowerCase()} publications...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="theme-input pl-10 pr-4 py-2 w-full rounded-full border-2 focus:ring-2 transition-all duration-200"
                style={{
                  borderColor: "var(--theme-card-border)",
                  backgroundColor: "var(--theme-input-bg)",
                }}
              />
            </div>
            {(searchQuery || authorRole !== "All") && (
              <p
                className="text-sm mt-2"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Showing {filteredPublications.length}{" "}
                {authorRole === "All"
                  ? "publication"
                  : authorRole === "CoAuthor"
                  ? "co-author"
                  : `${authorRole.toLowerCase()} author`}{" "}
                {filteredPublications.length !== 1 ? "entries" : "entry"}
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Timeline */}
        {filteredPublications.length > 0 ? (
          <PublicationTimeline
            filteredPublications={filteredPublications}
            isMobile={isMobile}
            theme={theme}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p
              className="text-lg"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              No publications found matching your filters.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setAuthorRole("All");
              }}
              variant="outline"
              className="mt-4 theme-button-secondary"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

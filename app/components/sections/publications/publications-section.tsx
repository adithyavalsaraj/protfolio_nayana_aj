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
    "All" | "First" | "Second" | "CoAuthor"
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
          {/* External Publication Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                onClick={() =>
                  window.open(
                    "https://ui.adsabs.harvard.edu/search/p_=0&q=docs(library%2FucoKF0gWQImVPLgZJ5pdlw)&sort=date%20desc%2C%20bibcode%20desc",
                    "_blank"
                  )
                }
                variant="outline"
                className="w-full sm:w-auto theme-button-secondary flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                NASA ADS
              </Button>
              <Button
                onClick={() =>
                  window.open("https://orcid.org/0000-0002-8070-5400", "_blank")
                }
                variant="outline"
                className="w-full sm:w-auto theme-button-secondary flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#A6CE39">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.525.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-1.016 5.016-5.344 5.016h-3.9V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.9-1.303 3.9-3.722 0-2.297-1.541-3.722-3.9-3.722h-2.297z" />
                </svg>
                ORCID
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://scholar.google.com/citations?user=63zBs60AAAAJ&hl=en",
                    "_blank"
                  )
                }
                variant="outline"
                className="w-full sm:w-auto theme-button-secondary flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                </svg>
                Google Scholar
              </Button>
            </div>
            <p
              className="text-xs text-center mt-3 px-4"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              View complete publication lists and citation metrics
            </p>
          </motion.div>
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {["All", "First", "Second", "CoAuthor"].map((role) => (
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

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePortfolio } from "../../../contexts/portfolio-context";

export function PublicationStatistics() {
  const { data } = usePortfolio();

  const [adsStats, setAdsStats] = useState({
    totalPublications: "—",
    firstAuthorPapers: "—",
    totalCitations: "—",
    hIndex: "—",
  });

  const publications = data?.publications || [];
  const totalPublications = publications.length;
  const leadAuthorPapers = publications.filter(
    (pub) => pub.authorRole === "First"
  ).length;

  useEffect(() => {
    const fetchADSStats = async () => {
      try {
        const res = await fetch("/api/ads", { cache: "no-store" });

        if (!res.ok) throw new Error("ADS API unavailable");
        const json = await res.json();
        setAdsStats({
          totalPublications: json.totalPublications ?? "—",
          firstAuthorPapers: json.firstAuthorCount ?? "—",
          totalCitations: json.totalCitations ?? "—",
          hIndex: json.hIndex ?? "—",
        });
      } catch (err) {
        console.error("ADS stats fetch failed:", err);
      }
    };

    // Fetch immediately
    fetchADSStats();

    // Auto-refresh every hour
    const interval = setInterval(fetchADSStats, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Total Publications", value: adsStats.totalPublications },
    { label: "First Author Papers", value: adsStats.firstAuthorPapers },
    { label: "Total Citations", value: adsStats.totalCitations },
    { label: "h-index", value: adsStats.hIndex },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto mb-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05 }}
            className="theme-card p-4 sm:p-6 text-center backdrop-blur-sm rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl sm:text-3xl font-bold theme-gradient-text mb-2">
              {stat.value}
            </div>
            <div className="text-sm sm:text-base text-[var(--theme-text-secondary)]">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

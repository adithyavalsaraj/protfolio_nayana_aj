"use client"

import { motion } from "framer-motion"
import { usePortfolio } from "../../../contexts/portfolio-context"

export function PublicationStatistics() {
  const { data } = usePortfolio()

  // Calculate total publications dynamically
  const totalPublications = data.publications.length
  const { leadAuthorPapers, totalCitations, hIndex } = data.statistics

  const stats = [
    { label: "Total Publications", value: totalPublications },
    { label: "Lead Author Papers", value: leadAuthorPapers },
    { label: "Total Citations", value: totalCitations },
    { label: "h-index", value: hIndex },
  ]

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
            <div className="text-2xl sm:text-3xl font-bold theme-gradient-text mb-2">{stat.value}</div>
            <div className="text-sm sm:text-base" style={{ color: "var(--theme-text-secondary)" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

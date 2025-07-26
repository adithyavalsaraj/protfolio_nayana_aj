"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { usePortfolio } from "../../../contexts/portfolio-context"

export function ResearchSection() {
  const { data } = usePortfolio()

  return (
    <section id="research" className="relative py-16 sm:py-20 z-10 px-4 sm:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 theme-gradient-text">
            Research Interests
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4" style={{ color: "var(--theme-text-secondary)" }}>
            Exploring the cosmos through cutting-edge research in exoplanet science and stellar astrophysics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {data.research.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="theme-card h-full">
                <CardHeader className="p-4 sm:p-6">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={project.image || "/placeholder.svg?height=300&width=400&query=research interest"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-tight theme-highlight">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

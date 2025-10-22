"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { usePortfolio } from "../../../contexts/portfolio-context";
import { DetailModal } from "../../ui/DetailModal";

export function ResearchSection() {
  const { data } = usePortfolio();
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <section
      id="research"
      className="relative py-16 sm:py-20 z-10 px-4 sm:px-6"
    >
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
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto px-4"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            Cosmic Explosions in exquisite detail: Discovery to detailed
            modeling.
          </p>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto px-4"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            FBOTs, Supernovae, Novae and more.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {data.research.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-full sm:w-[45%] md:w-[42%] lg:w-[40%] max-w-[500px]"
            >
              <Card
                onClick={() => setSelected(project)}
                className="theme-card h-full cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={
                        project.image ||
                        "/placeholder.svg?height=300&width=400&query=research"
                      }
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-tight theme-highlight underline">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 !pt-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-[var(--theme-text-secondary)] line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        image={selected?.image}
        title={selected?.title}
        actionButtons={
          <>
            {selected?.paperUrl && (
              <Button
                onClick={() => window.open(selected.paperUrl, "_blank")}
                className="theme-button-primary text-white flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Publication
              </Button>
            )}
          </>
        }
      >
        <p className="text-[var(--theme-text-secondary)] text-base leading-relaxed">
          {selected?.description}
        </p>
      </DetailModal>
    </section>
  );
}

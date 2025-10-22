"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePortfolio } from "../../../contexts/portfolio-context";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { data } = usePortfolio();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center z-10 px-4 sm:px-6 pt-20 sm:pt-24"
    >
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src={
                data.personal.profileImage ||
                "/placeholder.svg?height=200&width=200&query=profile"
              }
              alt="Profile"
              width={200}
              height={200}
              className="rounded-full mx-auto border-4 shadow-2xl w-32 h-32 sm:w-48 sm:h-48 lg:w-52 lg:h-52 object-cover border-[var(--theme-highlight-color)]"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 theme-gradient-text leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {data.personal.name}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8  text-[var(--theme-text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {data.personal.title}
          </motion.p>

          <motion.p
            className="text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4  text-[var(--theme-text-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {data.personal.bio}
          </motion.p>

          {data.personal?.bioSub && (
            <motion.p
              className="text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 text-[var(--theme-text-secondary)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {data.personal?.bioSub}
            </motion.p>
          )}

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button
              onClick={() => scrollToSection("research")}
              className="w-full sm:w-auto theme-button-primary text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore My Research
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="w-full sm:w-auto theme-button-secondary px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300"
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[--theme-highlight-color]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}

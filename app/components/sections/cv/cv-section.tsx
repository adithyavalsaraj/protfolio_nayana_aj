"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { usePortfolio } from "../../../contexts/portfolio-context";

export function CVSection() {
  const { data } = usePortfolio();

  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/documents/Nayana_AJ_CV.pdf";
    link.download = "Nayana_AJ_CV.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="cv" className="relative py-16 sm:py-20 z-10 px-4 sm:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 theme-gradient-text">
            Experience
          </h2>

          {/* CV Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <FileText
                className="w-6 h-6 mr-2"
                style={{ color: "var(--theme-highlight-color)" }}
              />
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--theme-text-primary)" }}
              >
                Academic Curriculum Vitae
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Complete academic CV including detailed research experience,
              publications, conference presentations, awards, and professional
              activities in astrophysics and stellar evolution research.
            </p>
          </motion.div>

          {/* CV Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center items-center mb-8"
          >
            <Button
              onClick={handleDownloadCV}
              className="w-full sm:w-auto theme-button-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5 mr-3" />
              Download Full CV
            </Button>
          </motion.div>

          {/* CV Stats - Dynamic Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold theme-gradient-text">
                {data.experience.length > 0
                  ? `${data.experience.length}+`
                  : "0"}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-gradient-text">
                {data.publications.length}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Publications
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-gradient-text">
                {data.statistics.totalCitations}+
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Citations
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {data.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-6 sm:mb-8"
            >
              <Card className="theme-card">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 leading-tight theme-highlight">
                        {exp.position}
                      </h3>
                      <p
                        className="font-medium text-sm sm:text-base break-words"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        {exp.institution}
                      </p>
                    </div>
                    <Badge className="theme-badge text-xs sm:text-sm self-start md:self-center whitespace-nowrap">
                      {exp.period}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

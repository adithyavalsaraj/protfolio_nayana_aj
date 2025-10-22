"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { usePortfolio } from "../../../contexts/portfolio-context";
import { getSocialIcon } from "../../social-icons";

interface ContactSectionProps {
  theme: string;
}

export function ContactSection({ theme }: ContactSectionProps) {
  const { data } = usePortfolio();

  return (
    <section
      id="contact"
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 theme-gradient-text">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4 text-[var(--theme-text-secondary)]">
            Interested in collaboration or have questions about my research? I'd
            love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="theme-card">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-6 theme-highlight">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 flex-shrink-0 text-[var(--theme-highlight-color)]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base text-[var(--theme-text-secondary)]">
                        Email
                        {Array.isArray(data.personal.email) &&
                        data.personal.email.length > 1
                          ? "s"
                          : ""}
                      </p>
                      <div className="space-y-1">
                        {Array.isArray(data.personal.email) ? (
                          data.personal.email.map((email, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                window.open(`mailto:${email}`, "_self")
                              }
                              className="font-medium text-sm sm:text-base break-all theme-highlight hover:underline cursor-pointer text-left block"
                            >
                              {email}
                            </button>
                          ))
                        ) : (
                          <button
                            onClick={() =>
                              window.open(
                                `mailto:${data.personal.email}`,
                                "_self"
                              )
                            }
                            className="font-medium text-sm sm:text-base break-all theme-highlight hover:underline cursor-pointer text-left"
                          >
                            {data.personal.email}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {data.personal?.location && (
                    <div className="flex items-center space-x-4">
                      <MapPin className="w-6 h-6 flex-shrink-0 text-[var(--theme-highlight-color)]" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base text-[var(--theme-text-secondary)]">
                          Location
                        </p>
                        <button
                          onClick={() =>
                            window.open(
                              `https://maps.google.com/search/${encodeURIComponent(
                                data.personal?.location ?? ""
                              )}`,
                              "_blank"
                            )
                          }
                          className="font-medium text-sm sm:text-base theme-highlight hover:underline cursor-pointer text-left"
                        >
                          {data.personal?.location}
                        </button>
                      </div>
                    </div>
                  )}

                  {data.personal?.social?.length ? (
                    <div className="pt-6 border-t border-[var(--theme-card-border)]">
                      <p className="mb-4 text-sm sm:text-base text-[var(--theme-text-secondary)]">
                        Connect with me:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {data.personal.social.map((link) => {
                          const Icon = getSocialIcon(link.url);
                          return (
                            <Button
                              key={link.id}
                              variant="outline"
                              size="sm"
                              className="theme-button-secondary text-xs sm:text-sm bg-transparent"
                              onClick={() => window.open(link.url, "_blank")}
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              {link.title}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

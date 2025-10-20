"use client";

import { motion } from "framer-motion";
import {
  BookOpenText,
  FileUser,
  Home,
  Mail,
  Menu,
  Moon,
  Star,
  Sun,
  X,
} from "lucide-react";
import { usePortfolio } from "../../contexts/portfolio-context";

interface NavigationProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  theme: string;
  toggleTheme: () => void;
}

export function Navigation({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  theme,
  toggleTheme,
}: NavigationProps) {
  const { data } = usePortfolio();

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "publications", label: "Publications", icon: BookOpenText },
    { id: "research", label: "Research Interests", icon: Star },
    { id: "cv", label: "CV", icon: FileUser },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 theme-nav border-b`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-lg sm:text-xl font-bold theme-gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            {data.personal.name}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm xl:text-base ${
                  activeSection === id
                    ? `${
                        theme === "dark"
                          ? "bg-purple-600/30 text-purple-300"
                          : "bg-blue-100 text-blue-700"
                      }`
                    : `${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white hover:bg-purple-600/20"
                          : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                      }`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </motion.button>
            ))}
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-blue-950/30 hover:bg-blue-900/40 text-yellow-300"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              } transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? (
                <motion.div
                  initial={{ rotate: -45 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 45 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-blue-950/30 hover:bg-blue-900/40 text-yellow-300"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              } transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>
            <button
              className={`p-2 rounded-md ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 pb-4 border-t"
            style={{ borderColor: "var(--theme-card-border)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-2 pt-4">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === id
                      ? `${
                          theme === "dark"
                            ? "bg-purple-600/30 text-purple-300"
                            : "bg-blue-100 text-blue-700"
                        }`
                      : `${
                          theme === "dark"
                            ? "text-gray-300 hover:text-white hover:bg-purple-600/20"
                            : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                        }`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

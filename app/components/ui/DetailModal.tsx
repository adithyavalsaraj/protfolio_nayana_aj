"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  image?: string;
  imageCaption?: string;
  title?: string;
  actionButtons?: React.ReactNode;
}

export const DetailModal = ({
  open,
  onClose,
  children,
  image,
  imageCaption,
  title,
  actionButtons,
}: DetailModalProps) => {
  const portalRoot = typeof window !== "undefined" ? document.body : null;

  // Disable background scroll
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          {/* Modal container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col bg-[var(--theme-card-bg)] rounded-2xl shadow-2xl max-w-5xl w-full border border-[var(--theme-card-border)] overflow-hidden max-h-[90vh]"
          >
            {/* Sticky Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto">
              {image && (
                <img
                  src={image}
                  alt={title || "modal image"}
                  className="w-full h-auto object-cover rounded-t-2xl"
                />
              )}

              {imageCaption && (
                <p className="text-xs text-[var(--theme-text-secondary)] p-2 text-center">
                  fig: {imageCaption}
                </p>
              )}

              <div className="p-6 sm:p-8">
                {/* add bottom padding to avoid hidden content behind footer */}
                {title && (
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 theme-gradient-text">
                    {title}
                  </h2>
                )}
                {children}
              </div>
            </div>

            {/* Sticky footer */}
            {actionButtons && (
              <div className="sticky bottom-0 left-0 w-full bg-[var(--theme-card-bg)] px-6 sm:px-8 py-4 flex flex-wrap justify-end items-center gap-3">
                {actionButtons}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return portalRoot ? createPortal(modal, portalRoot) : null;
};

"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  FileText,
  Download,
  ImageIcon as ImageIconLucide,
  Film,
  Music,
  File,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Eye,
} from "lucide-react"
import { usePortfolio } from "../../contexts/portfolio-context"
import { useTheme } from "../../contexts/theme-context"
import { SpaceBackground } from "../../components/space-background"
import { useState, useEffect } from "react"

export default function PublicationDetailPageClient() {
  const params = useParams()
  const slug = Array.isArray(params.id) ? params.id[0] : params.id
  const router = useRouter()
  const { data, generateSlug } = usePortfolio()

  // Find publication by matching the generated slug from its title
  const publication = data.publications.find((p) => generateSlug(p.title) === slug)

  const { theme } = useTheme()

  const [fileObjectUrl, setFileObjectUrl] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (publication?.fileData && publication.fileType) {
      // Convert Base64 to Blob and create object URL
      const byteCharacters = atob(publication.fileData.split(",")[1])
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: publication.fileType })
      const url = URL.createObjectURL(blob)
      setFileObjectUrl(url)

      // Clean up object URL when component unmounts or fileData/fileType changes
      return () => {
        URL.revokeObjectURL(url)
        setFileObjectUrl(null)
      }
    }
  }, [publication?.fileData, publication?.fileType])

  // Calculate file size
  const getFileSize = () => {
    if (!publication?.fileData) return null
    const sizeInBytes = publication.fileData.length * 0.75 // Base64 to bytes approximation
    if (sizeInBytes > 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`
    } else {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`
    }
  }

  if (!publication) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-theme-text-primary"
        style={{ backgroundColor: "var(--theme-bg)" }}
      >
        <SpaceBackground />
        <Card className="theme-card max-w-md mx-auto p-6 text-center z-10">
          <CardTitle className="theme-highlight mb-4">Publication Not Found</CardTitle>
          <CardDescription style={{ color: "var(--theme-text-secondary)" }}>
            The publication you are looking for does not exist.
          </CardDescription>
          <Button onClick={() => router.push("/?section=publications")} className="mt-6 theme-button-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Publications
          </Button>
        </Card>
      </div>
    )
  }

  const renderFilePreview = () => {
    if (!fileObjectUrl || !publication.fileType) {
      return (
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-gray-800/30 rounded-lg border border-gray-700/50 text-gray-400">
          <File className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
          <p className="text-sm sm:text-base text-center px-4">No file available for preview.</p>
        </div>
      )
    }

    if (publication.fileType.startsWith("image/")) {
      return (
        <div className="relative group">
          {/* Mobile-optimized image container */}
          <div
            className={`relative overflow-hidden rounded-lg border ${isFullscreen ? "fixed inset-4 z-50 bg-black/90 flex items-center justify-center" : ""}`}
            style={{ borderColor: "var(--theme-card-border)" }}
          >
            <img
              src={fileObjectUrl || "/placeholder.svg?height=600&width=800&query=publication image preview"}
              alt={`Preview of ${publication.title}`}
              className={`w-full h-auto object-contain rounded-lg ${
                isFullscreen
                  ? "max-h-full max-w-full"
                  : "max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
              }`}
              onClick={() => isMobile && setIsFullscreen(!isFullscreen)}
            />

            {/* Fullscreen toggle button - desktop only */}
            {!isMobile && (
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}

            {/* Close button for fullscreen */}
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 p-2 bg-black/70 text-white rounded-full hover:bg-black/90 z-10"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Mobile tap hint */}
          {isMobile && !isFullscreen && (
            <p className="text-xs text-gray-400 text-center mt-2">Tap image to view fullscreen</p>
          )}
        </div>
      )
    } else if (publication.fileType.startsWith("video/")) {
      return (
        <div className="relative">
          <video
            src={fileObjectUrl}
            controls
            className="w-full h-auto max-h-[250px] sm:max-h-[350px] md:max-h-[450px] lg:max-h-[600px] rounded-lg border"
            style={{ borderColor: "var(--theme-card-border)" }}
            preload="metadata"
            playsInline // Important for mobile
          >
            Your browser does not support the video tag.
          </video>
          <p className="text-xs text-gray-400 text-center mt-2">
            {isMobile ? "Tap to play video" : "Click to play video"}
          </p>
        </div>
      )
    } else if (publication.fileType.startsWith("audio/")) {
      return (
        <div className="w-full">
          <div
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 sm:p-6 border"
            style={{ borderColor: "var(--theme-card-border)" }}
          >
            <div className="flex items-center justify-center mb-4">
              <Music className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            </div>
            <audio src={fileObjectUrl} controls className="w-full rounded-lg" preload="metadata">
              Your browser does not support the audio tag.
            </audio>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Audio file - use controls to play</p>
        </div>
      )
    } else if (publication.fileType === "application/pdf") {
      return (
        <div className="flex flex-col space-y-4">
          <div
            className="w-full overflow-auto border rounded-lg p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-800"
            style={{ borderColor: "var(--theme-card-border)" }}
          >
            <div className="flex flex-col items-center justify-center h-48 sm:h-56 lg:h-64 text-gray-600 dark:text-gray-400">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
              <p className="text-center mb-4 text-sm sm:text-base font-medium">PDF Document</p>
              <p className="text-xs sm:text-sm text-center px-4 leading-relaxed">
                {isMobile
                  ? "PDF preview is not available on mobile. Tap the download button below to view the document."
                  : "PDF preview is not available in the browser. Click the download button below to view the full document."}
              </p>
              {getFileSize() && <p className="text-xs text-gray-500 mt-2">File size: {getFileSize()}</p>}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-gray-800/30 rounded-lg border border-gray-700/50 text-gray-400">
          <File className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
          <p className="text-center text-sm sm:text-base px-4">Preview not available for this file type</p>
          <p className="text-xs text-gray-500 mt-1">({publication.fileType})</p>
          {getFileSize() && <p className="text-xs text-gray-500 mt-2">File size: {getFileSize()}</p>}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen text-theme-text-primary relative" style={{ backgroundColor: "var(--theme-bg)" }}>
      <SpaceBackground />
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Button
            onClick={() => router.push("/?section=publications")}
            variant="outline"
            className="mb-6 sm:mb-8 theme-button-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Publications
          </Button>

          <Card className="theme-card p-4 sm:p-6 lg:p-8 mb-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 theme-gradient-text leading-tight">
                {publication.title}
              </CardTitle>
              <CardDescription
                className="text-base sm:text-lg lg:text-xl leading-relaxed"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                {publication.authors}
              </CardDescription>
              <p className="font-medium text-sm sm:text-base lg:text-lg theme-highlight">
                {publication.journal}, {publication.year}
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="theme-badge text-xs sm:text-sm">{publication.type}</Badge>
                {publication.citations !== undefined && (
                  <Badge className="theme-badge text-xs sm:text-sm">Citations: {publication.citations}</Badge>
                )}
              </div>

              {/* External Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                {publication.adsUrl && (
                  <Button
                    onClick={() => window.open(publication.adsUrl, "_blank")}
                    variant="ghost"
                    size="sm"
                    className="text-xs px-3 py-2 h-auto theme-highlight hover:bg-opacity-10 transition-all duration-200 flex items-center gap-2"
                    style={{
                      backgroundColor: theme === "dark" ? "rgba(147, 51, 234, 0.1)" : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <Eye className="w-4 h-4 flex-shrink-0" />
                    <span>View on NASA ADS</span>
                  </Button>
                )}

                {publication.doi && (
                  <Button
                    onClick={() => window.open(`https://doi.org/${publication.doi}`, "_blank")}
                    variant="ghost"
                    size="sm"
                    className="text-xs px-3 py-2 h-auto theme-highlight hover:bg-opacity-10 transition-all duration-200 flex items-center gap-2"
                    style={{
                      backgroundColor: theme === "dark" ? "rgba(147, 51, 234, 0.1)" : "rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    <span>DOI: {publication.doi}</span>
                  </Button>
                )}
              </div>

              {publication.fileData && publication.fileType && (
                <div className="mt-6 sm:mt-8 pt-6 border-t" style={{ borderColor: "var(--theme-card-border)" }}>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 theme-highlight flex items-center gap-2 flex-wrap">
                    {publication.fileType.startsWith("image/") && <ImageIconLucide className="w-5 h-5 flex-shrink-0" />}
                    {publication.fileType.startsWith("application/pdf") && (
                      <FileText className="w-5 h-5 flex-shrink-0" />
                    )}
                    {publication.fileType.startsWith("video/") && <Film className="w-5 h-5 flex-shrink-0" />}
                    {publication.fileType.startsWith("audio/") && <Music className="w-5 h-5 flex-shrink-0" />}
                    {!publication.fileType.startsWith("image/") &&
                      !publication.fileType.startsWith("application/pdf") &&
                      !publication.fileType.startsWith("video/") &&
                      !publication.fileType.startsWith("audio/") && <File className="w-5 h-5 flex-shrink-0" />}
                    <span className="break-words">Associated File</span>
                  </h3>

                  {/* Mobile-optimized file preview */}
                  <div className="mb-4">{renderFilePreview()}</div>

                  {/* Download button - mobile-optimized */}
                  <a
                    href={fileObjectUrl || publication.fileData}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`${publication.title.replace(/[^a-z0-9]/gi, "_")}.${publication.fileType.split("/")[1] || "file"}`}
                    className="w-full mt-4 block"
                  >
                    <Button className="w-full theme-button-primary text-sm sm:text-base py-3 sm:py-4">
                      <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        Download{" "}
                        {publication.fileType.startsWith("application/pdf")
                          ? "PDF"
                          : publication.fileType.startsWith("image/")
                            ? "Image"
                            : publication.fileType.startsWith("video/")
                              ? "Video"
                              : publication.fileType.startsWith("audio/")
                                ? "Audio"
                                : "File"}
                        {getFileSize() && ` (${getFileSize()})`}
                      </span>
                    </Button>
                  </a>

                  <p className="text-xs text-gray-400 text-center mt-3 px-2 leading-relaxed">
                    {isMobile
                      ? "Note: Files from local uploads are temporary and may not persist after closing the app."
                      : "Note: Previews from local uploads are temporary and may not persist after closing the browser."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

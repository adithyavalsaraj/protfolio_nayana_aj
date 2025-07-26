"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4">
      <Card className="max-w-md w-full bg-black/30 border-red-500/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="text-6xl font-bold text-red-400 mb-4">⚠️</div>
          <CardTitle className="text-2xl text-white">Something went wrong!</CardTitle>
          <CardDescription className="text-gray-300">An unexpected error occurred. Please try again.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={reset} className="w-full bg-red-600 hover:bg-red-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="w-full border-red-500/50 text-red-300 hover:bg-red-500/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

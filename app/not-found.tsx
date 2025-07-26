"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4">
          <Card className="max-w-md w-full bg-black/30 border-purple-500/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="text-6xl font-bold text-purple-400 mb-4">404</div>
              <CardTitle className="text-2xl text-white">Page Not Found</CardTitle>
              <CardDescription className="text-gray-300">
                The page you are looking for does not exist or has been moved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link href="/?section=publications" className="block">
                <Button
                  variant="outline"
                  className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View Publications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}

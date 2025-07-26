"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4">
          <div className="max-w-md w-full bg-black/30 border border-red-500/20 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-6xl font-bold text-red-400 mb-4">⚠️</div>
            <h2 className="text-2xl text-white mb-4">Something went wrong!</h2>
            <p className="text-gray-300 mb-6">A critical error occurred. Please refresh the page.</p>
            <button
              onClick={reset}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for portfolio deployment
  output: 'export',
  trailingSlash: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Remove experimental features that cause issues
  // experimental: {
  //   optimizeCss: true, // This was causing the 'critters' error
  //   optimizePackageImports: ['lucide-react', 'framer-motion'],
  // },
  
  // Compression
  compress: true,
  
  // Disable server-side features for static export
  async rewrites() {
    return []
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
  
  // ESLint and TypeScript configurations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

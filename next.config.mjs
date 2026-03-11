/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization with modern formats
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85], // Added 85 to fix the warning
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Performance optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,

  // Allow dev origins to fix cross-origin warning
  allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],

  // On-demand entries for development
  onDemandEntries: {
    maxInactiveAge: 120000, // 2 minutes
    pagesBufferLength: 5,
  },

  // HTTP headers for performance
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://*.vercel.com",
      "frame-src 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ")

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|gif|ico|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(js|css|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig

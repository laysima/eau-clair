import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Content-hashed media: a new encode ships under a new filename, so
        // these can be cached for a year without ever serving a stale file.
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  images: {
    // 75 is Next's default; 95 is allowed for the hero, which fills the screen
    // and shows compression far more than a card-sized image does.
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mdetoprztpxewognttgd.supabase.co',  // Add your Supabase domain
      },
    ],
  },
};

export default nextConfig;
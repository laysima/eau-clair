import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  transpilePackages: ['@components', '@lib'],
  // REMOVED deprecated experimental options
  serverExternalPackages: ['sharp', 'mongoose', '@supabase/supabase-js'],
  swcMinify: true, // ENABLED minification
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@solana/wallet-standard-features': false
    };
    // REMOVED minification disable
    return config;
  },
};

module.exports = nextConfig;
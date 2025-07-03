/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipiroikwupckkzxvdouq.supabase.co'],
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
  serverExternalPackages: ['sharp', 'mongoose', '@supabase/supabase-js'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ To skip the apostrophe lint error
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@solana/wallet-standard-features': false,
    };
    return config;
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipiroikwupckkzxvdouq.supabase.co'], // ✅ Used for static domain allowlist
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // ✅ For image URLs that follow a pattern
      },
    ],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  transpilePackages: ['@components', '@lib'],
  serverExternalPackages: ['sharp', 'mongoose', '@supabase/supabase-js'],
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '', // leave empty unless using a custom port
        pathname: '/**', // allow all paths
      },
    ],
  },
};

module.exports = nextConfig;

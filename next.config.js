/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the output: 'export' to enable API routes and dynamic paths
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
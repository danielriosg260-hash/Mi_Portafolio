/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // turbopack: {} vacío para validar esquema de Next.js 16.1.0
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.extensions = ['.js', '.tsx', '.ts'];
    }
    return config;
  },
}

module.exports = nextConfig
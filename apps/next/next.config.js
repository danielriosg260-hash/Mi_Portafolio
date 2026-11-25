/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración Turbopack compatible (vacía = usar defaults)
  turbopack: {},
  // Configuración webpack mínima (solo para modo server si es necesario)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.extensionJs = ['.js', '.tsx', '.ts'];
      config.resolve.extensions = ['.js', '.tsx', '.ts'];
    }
    return config;
  },
}

module.exports = nextConfig
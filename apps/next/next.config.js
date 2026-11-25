/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Forzar modo webpack en lugar de Turbopack por compatibilidad con react-native
  turbopack: false,
  // Configuración webpack para módulos react-native
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.extensionJs = ['.js', '.tsx', '.ts'];
      config.resolve.extensions = ['.js', '.tsx', '.ts'];
    }
    return config;
  },
  // Opcional: silenciar advertencias específicas
  compiler: {
    // removerWarnings: ['import-type'],
  },
}

module.exports = nextConfig
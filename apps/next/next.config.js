/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Forzar transpilar react-native para evitar errores de tipos en Vercel
  transpileModules: ['react-native', 'react-native-reanimated', 'react-native-gesture-handler', 'react-native-safe-area-context', 'react-native-screens', 'react-native-web'],
  // Configuración de imágenes
  images: {
    domains: [],
  },
  // Configuración webpack para módulos
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.extensionJs = ['.js', '.tsx', '.ts'];
      config.resolve.extensions = ['.js', '.tsx', '.ts'];
    }
    return config;
  },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpilar react-native para evitar errores de types en Vercel
  transpileModules: [
    'react-native',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-safe-area-context',
    'react-native-screens',
    'react-native-web',
  ],
  // Otras configuraciones
  images: {
    domains: [],
  },
  // Configurar el directorio raíz para el monorepo
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.extensionJs = ['.js', '.tsx', '.ts'];
      config.resolve.extensions = ['.js', '.tsx', '.ts'];
    }
    return config;
  },
}

module.exports = nextConfig
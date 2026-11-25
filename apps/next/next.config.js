/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Alias para que react-native se resuelva como react-native-web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': 'react-native-web',
    }
    if (isServer) {
      config.resolve.extensions = ['.js', '.tsx', '.ts'];
    }
    return config;
  },
}

module.exports = nextConfig
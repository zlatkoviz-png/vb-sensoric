/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cms',
        port: '1337',
      },
      {
        protocol: 'http',
        hostname: '192.168.3.90',
        port: '8211',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;

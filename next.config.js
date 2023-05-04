/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://188.166.114.84/api/v1/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig

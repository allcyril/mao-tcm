/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/api/cms',
        permanent: false,
      },
      {
        source: '/admin/',
        destination: '/api/cms',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig

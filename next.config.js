/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
    ],
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

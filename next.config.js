/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1', 'localhost', 'cdn.pixabay.com'],
  },
  reactStrictMode: true,
  webpack: {
    fs: false
  }
};

module.exports = nextConfig;

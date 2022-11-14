/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1', 'localhost'],
  },
  reactStrictMode: true,
  webpack: {
    fs: false
  }
};

module.exports = nextConfig;

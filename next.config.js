/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['127.0.0.1', 'localhost', 'cdn.pixabay.com', 'as1.ftcdn.net'],
  },
  reactStrictMode: true,
  i18n: {
    locales: ['pt'],
    defaultLocale: 'pt',
  },
};

module.exports = nextConfig;

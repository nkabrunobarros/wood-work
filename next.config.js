/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
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

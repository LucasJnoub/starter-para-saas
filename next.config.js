// next.config.js
const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
};

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
})(config);

module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  ...nextConfig,
};
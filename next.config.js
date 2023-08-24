/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "i.ibb.co",
      "smsactivate.s3.eu-central-1.amazonaws.com",
      "avatars.githubusercontent.com",
    ],
  },
  swcMinify: true,
  fastRefresh: true,
  concurrentFeatures: true,
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  minify: false, // Disable minification
};

module.exports = nextConfig;

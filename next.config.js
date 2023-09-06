/** @type {import('next').NextConfig} */

const nextConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  crossOrigin: "anonymous",
  images: {
    domains: [
      "i.ibb.co",
      "smsactivate.s3.eu-central-1.amazonaws.com",
      "avatars.githubusercontent.com",
      "s3.cryptwerk.com",
    ],
  },
};

module.exports = nextConfig;

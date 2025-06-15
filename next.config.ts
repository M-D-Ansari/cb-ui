/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables lint errors in production builds
  },
};

module.exports = nextConfig;

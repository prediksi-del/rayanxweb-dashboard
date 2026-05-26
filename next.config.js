/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }, // Mengabaikan error linting saat build
};
module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "images.vexels.com",
      },
      {
        hostname: "thegivingblock.com",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        // Match all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;

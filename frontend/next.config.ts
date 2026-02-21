/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "https://entrance.kkffgold.co.in"],
    unoptimized: true,
  },
  // output: "export",
  async rewrites() {
    return [
      {
        source: "/api/chat",
        destination: "https://chatbot.studyitnepal.com/chat",
      },
    ];
  },
};

export default nextConfig;

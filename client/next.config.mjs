/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dxhb0gq8u/image/upload/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;

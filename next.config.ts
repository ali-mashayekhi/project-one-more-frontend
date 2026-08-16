import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/images/**",
      },
    ],
    ...(isDevelopment && {
      dangerouslyAllowLocalIP: true,
    }),
  },
};

export default nextConfig;

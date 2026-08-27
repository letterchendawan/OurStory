import type { NextConfig } from "next";

const basePath = "/Zulaikha-Iqbal";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  agentRules: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ditifn5y3/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

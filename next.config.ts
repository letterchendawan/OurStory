import type { NextConfig } from "next";

// GitHub Actions passes the Pages base path (e.g. "/repo-name", or "" for a
// username.github.io repo), so the site follows whichever repo deploys it.
// Locally it defaults to the root: http://localhost:3000/
const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");

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

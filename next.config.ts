import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Server Actions default is 1 MB; must live under experimental (not top-level serverActions).
    serverActions: {
      bodySizeLimit: "50mb",
    },
    // Large multipart requests (e.g. forms with images) through the Next proxy/middleware path.
    proxyClientMaxBodySize: "50mb",
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Permanent redirect for the old /about route — content lives on / now.
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

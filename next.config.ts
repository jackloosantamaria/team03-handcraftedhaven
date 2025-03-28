import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: 'incremental', // Keep this outside `redirects`
  },
  async redirects() {
    return [
      {
        source: '/navegation',
        destination: '/ui/navegation',
        permanent: true,
      },
      {
        source: '/navegation/:path*', // This covers all sub-routes like /ui/navegation, /ui/login
        destination: '/ui/navegation/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

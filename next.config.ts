import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: 'incremental', // Keep this outside `redirects`
  },
  async redirects() {
    return [
      {
        source: '/navigation',
        destination: '/ui/navigation',
        permanent: true,
      },
      {
        source: '/navigation/:path*', // This covers all sub-routes like /ui/navigation, /ui/login
        destination: '/ui/navigation/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.bdwebai.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'sweepstake.webjuwa.com',
    //     port: '',
    //     pathname: '/storage/**',
    //   },
    // ],
  },
};

export default nextConfig;

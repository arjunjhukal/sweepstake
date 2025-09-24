import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.bdwebai.com',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'sweepstake.webjuwa.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;

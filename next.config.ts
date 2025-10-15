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
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*', // Requests to /api/backend/* from your frontend
        destination: 'https://app.bdwebai.com/:path*', // Will be rewritten to your Laravel API
      },
    ];
  },
};

export default nextConfig;

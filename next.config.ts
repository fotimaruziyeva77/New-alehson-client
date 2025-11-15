import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['api.alehson.uz'], 
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
};

export default nextConfig;

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profile-record.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profile-record.s3.amazonaws.com',
      },
      {
        protocol:'https',
        hostname:'creator-portal-bucket.s3.us-east-2.amazonaws.com'
      }
    ],
  },
};

export default nextConfig;

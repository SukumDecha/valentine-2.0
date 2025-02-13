/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.yourtango.com',
          },
          {
            protocol: 'https',
            hostname: 'i.scdn.co'
          }
        ],
      },
    
};

export default nextConfig;

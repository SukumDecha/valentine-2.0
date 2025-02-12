/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.scdn.co'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.yourtango.com',
          },
        ],
      },
    
};

export default nextConfig;

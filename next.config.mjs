/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // Allows all https hostnames
          },
          {
            protocol: 'http',
            hostname: '**', // Allows all http hostnames (use with caution)
          },
        ],
      },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
//import {experiments} from 'next/dist/webpack-config';
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config
    }
  };
  
export default nextConfig;
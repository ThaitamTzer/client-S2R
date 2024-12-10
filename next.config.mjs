/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'raw.githubusercontent.com',
      'minio.theciu.vn',
      'i.pravatar.cc',
      'picsum.photos',
      'api.httzip.com',
      'api.vietqr.io',
      'img.youtube.com',
    ],
  },
}

export default nextConfig

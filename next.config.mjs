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
      'www.shinhancard.com',
    ],
  },
  optimizeFonts: true,
  swcMinify: true,
  // Bật tree shaking cho các module
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  staticPageGenerationTimeout: 120, // Tăng timeout lên 120 giây
  // webpack(config) {
  //   // Kiểm tra tree-shaking
  //   config.optimization.usedExports = true
  //   return config
  // },
}

export default nextConfig

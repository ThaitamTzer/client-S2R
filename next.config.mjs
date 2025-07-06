/** @type {import('next').NextConfig} */

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@mantine/core', 
      '@mantine/hooks', 
      '@mantine/dates',
      '@mantine/charts',
      '@mantine/carousel',
      'antd',
      '@ant-design/icons',
      '@tabler/icons-react'
    ],
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
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  optimizeFonts: true,
  swcMinify: true,
  // Enhanced tree shaking and modular imports
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    'lodash': {
      transform: 'lodash/{{member}}',
    },
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
    },
    'antd': {
      transform: 'antd/es/{{member}}',
    },
    '@ant-design/icons': {
      transform: '@ant-design/icons/{{member}}',
    },
  },
  staticPageGenerationTimeout: 120,
  // Webpack optimizations
  webpack(config) {
    // Better tree-shaking
    config.optimization.usedExports = true
    
    // Exclude moment.js to force dayjs usage
    config.resolve.alias = {
      ...config.resolve.alias,
      'moment': 'dayjs',
    }
    
    return config
  },
  // Compression and caching
  compress: true,
  poweredByHeader: false,
  // Better performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)

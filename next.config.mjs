/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Performance optimizations
  swcMinify: true,
  optimizeFonts: true,
  
  // Enhanced experimental features
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: [
      '@mantine/core', 
      '@mantine/hooks',
      '@mantine/dates',
      '@mantine/charts',
      '@mantine/carousel',
      '@tabler/icons-react',
      '@ant-design/icons',
      'lodash',
      'recharts',
      'framer-motion',
    ],
    // Improve build performance
    optimizeServerReact: true,
  },
  
  // Image optimization
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
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enhanced tree shaking for better bundle optimization
  modularizeImports: {
    '@ant-design/icons': {
      transform: '@ant-design/icons/{{member}}',
    },
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  
  // Performance improvements
  staticPageGenerationTimeout: 120,
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable React optimization
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Enable tree-shaking
    config.optimization.usedExports = true
    
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          ui: {
            test: /[\\/]node_modules[\\/](@mantine|antd)[\\/]/,
            name: 'ui-libs',
            priority: 10,
            chunks: 'all',
          },
          icons: {
            test: /[\\/]node_modules[\\/](@tabler\/icons-react|@ant-design\/icons)[\\/]/,
            name: 'icons',
            priority: 10,
            chunks: 'all',
          },
        },
      }
    }
    
    return config
  },
}

export default withBundleAnalyzer(nextConfig)

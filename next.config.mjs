/** @type {import('next').NextConfig} */

const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      '@mantine/core', 
      '@mantine/hooks', 
      '@mantine/dates',
      '@mantine/charts',
      '@mantine/carousel',
      '@tabler/icons-react',
      'dayjs',
      'lodash'
    ],
    // Enable app directory optimizations
    appDir: true,
    // Enable faster builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
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
    // Add responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Font optimization
  optimizeFonts: true,
  
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable React optimizations
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Enhanced tree shaking and modular imports
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@ant-design/icons': {
      transform: '@ant-design/icons/{{member}}',
    },
    'lodash': {
      transform: 'lodash/{{member}}',
    },
    'dayjs': {
      transform: 'dayjs/{{member}}',
    },
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
    },
  },

  // Build timeouts and performance
  staticPageGenerationTimeout: 120,
  
  // Bundle analysis and optimization
  webpack: (config, { dev, isServer }) => {
    // Enable tree shaking
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };

    // Bundle analysis for development
    if (dev && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: false,
        })
      );
    }

    // Optimize chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        // Framework chunk (React, Next.js)
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
        // UI libraries chunk
        ui: {
          name: 'ui',
          test: /[\\/]node_modules[\\/](@mantine|antd|@ant-design)[\\/]/,
          priority: 30,
          chunks: 'all',
        },
        // Utilities chunk
        utils: {
          name: 'utils',
          test: /[\\/]node_modules[\\/](lodash|dayjs|axios|uuid)[\\/]/,
          priority: 20,
          chunks: 'all',
        },
        // Icons chunk
        icons: {
          name: 'icons',
          test: /[\\/]node_modules[\\/](@tabler\/icons-react|@ant-design\/icons)[\\/]/,
          priority: 25,
          chunks: 'all',
        },
        // Default chunk
        default: {
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    };

    return config;
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Performance monitoring
  ...(process.env.NODE_ENV === 'production' && {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  }),
}

export default nextConfig

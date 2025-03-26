import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/img2pxl',
  images: {
    unoptimized: true,
  },
}

export default nextConfig

import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const nextConfig: NextConfig = {
  // Standalone build = `.next/standalone/server.js` + traced node_modules.
  // Required for our Dockerfile (Stage 3 copies that bundle).
  output: 'standalone',
  images: {
    localPatterns: [
      {
        // Local-disk Media (dev) — Payload serves uploaded files here.
        pathname: '/api/media/file/**',
      },
    ],
    remotePatterns: [
      {
        // Supabase Storage public bucket (prod) — once the S3 plugin is
        // enabled, Media uploads' `url` points at this host.
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

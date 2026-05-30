import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // Adds a "Back to site" link at the top of the admin sidebar so editors
      // can navigate back to the public site (/) from anywhere in /admin.
      beforeNavLinks: ['/components/admin/BackToSite#default'],
    },
  },
  collections: [Users, Media, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  // S3-compatible storage is enabled only when the S3_* env vars are present
  // (i.e. in production via .env.production). Local dev has no S3_* set so
  // Payload falls back to the default local-disk storage at /media — letting
  // us keep the fast dev loop without round-tripping to Supabase.
  plugins:
    process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
      ? [
          s3Storage({
            collections: {
              media: {
                // Bucket is public, so write the direct Supabase public URL
                // into the `url` field instead of routing every image fetch
                // through Payload's /api/media/file proxy. Faster + lets
                // next/image hit Supabase directly (allowlisted in next.config).
                disablePayloadAccessControl: true,
                // Supabase's S3 API endpoint and its public-read endpoint
                // live at different paths on the same host:
                //   S3 API:     <host>/storage/v1/s3/<bucket>/<file>
                //   Public read: <host>/storage/v1/object/public/<bucket>/<file>
                // The plugin defaults to the S3 path (auth required, 403 for
                // public fetches), so we derive the public path here.
                generateFileURL: ({ filename, prefix }) => {
                  const base = (process.env.S3_ENDPOINT || '').replace(
                    '/storage/v1/s3',
                    '/storage/v1/object/public',
                  )
                  const path = prefix ? `${prefix}/${filename}` : filename
                  return `${base}/${process.env.S3_BUCKET}/${path}`
                },
              },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION || 'us-east-1',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
              // Supabase Storage requires path-style addressing
              // (https://<host>/<bucket>/<file>, not virtual-host).
              forcePathStyle: true,
            },
          }),
        ]
      : [],
})

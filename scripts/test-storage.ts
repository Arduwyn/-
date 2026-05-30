import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * End-to-end Supabase Storage smoke test.
 *
 * Run via:   pnpm test:storage:prod
 *
 * What it does:
 *  1. Boots Payload Local API against whatever env is loaded
 *     (`.env.production` when run via the `:prod` script).
 *  2. Uploads a 1×1 transparent PNG to the `media` collection through
 *     Payload — which routes through the S3 plugin if S3_* vars are set.
 *  3. Fetches the resulting public URL to confirm the file actually
 *     reached Supabase Storage and is readable.
 *  4. Deletes the test upload to keep the bucket clean.
 *
 * Prints clear PASS/FAIL output. Exits non-zero on failure.
 */

// 1x1 transparent PNG — the smallest valid PNG we can construct.
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64',
)

function check(name: string, ok: boolean, detail?: string) {
  const mark = ok ? '✅' : '❌'
  console.log(`  ${mark} ${name}${detail ? ` — ${detail}` : ''}`)
  if (!ok) process.exitCode = 1
}

async function main() {
  console.log('\n🔧 Supabase Storage smoke test\n')

  // Sanity-check env so we fail fast with a clear message.
  const need = ['DATABASE_URI', 'S3_ENDPOINT', 'S3_BUCKET', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY']
  const missing = need.filter((k) => !process.env[k])
  if (missing.length) {
    console.error(`Missing env vars: ${missing.join(', ')}`)
    console.error('Hint: run via `pnpm test:storage:prod` so .env.production is loaded.')
    process.exit(1)
  }

  console.log(`  Endpoint: ${process.env.S3_ENDPOINT}`)
  console.log(`  Bucket:   ${process.env.S3_BUCKET}`)
  console.log(`  Region:   ${process.env.S3_REGION ?? '(default)'}\n`)

  const payload = await getPayload({ config: await config })

  const filename = `smoke-test-${Date.now()}.png`
  console.log(`  Uploading ${filename} (${TINY_PNG.length} bytes)...`)

  let createdId: number | string | undefined
  try {
    const doc = await payload.create({
      collection: 'media',
      data: { alt: 'storage smoke test (auto-deleted)' },
      file: {
        data: TINY_PNG,
        mimetype: 'image/png',
        name: filename,
        size: TINY_PNG.length,
      },
    })

    createdId = doc.id
    check('Upload + Postgres row created', true, `id=${doc.id}`)
    check('URL was generated', Boolean(doc.url), doc.url ?? 'no url')

    if (doc.url) {
      if (doc.url.startsWith('http')) {
        // Direct Supabase public URL — verify it actually serves bytes.
        const res = await fetch(doc.url)
        check(`Public URL reachable`, res.ok, `${res.status} ${res.statusText} (${doc.url})`)

        if (res.ok) {
          const contentType = res.headers.get('content-type')
          check('Content-Type is image/png', contentType?.includes('image/png') ?? false, contentType ?? 'none')
        }
      } else {
        // Relative URL = Payload's media proxy (only works while the app is
        // running). Skip fetching, but warn — direct URLs are what we want.
        check(
          'URL is direct Supabase public URL',
          false,
          `got proxy URL "${doc.url}" — plugin should set disablePayloadAccessControl`,
        )
      }
    }
  } catch (err) {
    check('Upload', false, err instanceof Error ? err.message : String(err))
  } finally {
    if (createdId !== undefined) {
      try {
        await payload.delete({ collection: 'media', id: createdId })
        console.log(`  🧹 Cleaned up test upload (id=${createdId})`)
      } catch (err) {
        console.warn(`  ⚠️  Couldn't delete test upload — please remove manually (id=${createdId})`)
        console.warn(err)
      }
    }
  }

  console.log('')
  if (process.exitCode) {
    console.log('❌ Smoke test FAILED — see ❌ lines above')
    process.exit(1)
  }
  console.log('✅ All checks passed — Supabase Storage is wired correctly.\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})

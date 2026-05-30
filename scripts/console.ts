import 'dotenv/config'
import repl from 'node:repl'

import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * REPL into Payload's Local API — the `rails console` equivalent for this app.
 *
 * Run with:   pnpm console
 *
 * Drops you into an interactive Node REPL with `payload` (and the shortcut `p`)
 * pre-loaded so you can query and mutate the DB through Payload's own API —
 * which respects hooks, validation, and access control just like the admin UI.
 *
 *   await payload.find({ collection: 'pages' })
 *   await payload.findByID({ collection: 'pages', id: 1 })
 *   await payload.update({ collection: 'pages', id: 1, data: { title: 'New' } })
 *   await payload.delete({ collection: 'media', id: 3 })
 */
async function main() {
  const payload = await getPayload({ config: await config })

  // eslint-disable-next-line no-console
  console.log(`
  Arduwyn console — Payload Local API loaded.

  Available:
    payload  — full Local API (alias: p)

  Examples:
    await payload.find({ collection: 'pages' })
    await payload.find({ collection: 'media' })
    await payload.findByID({ collection: 'pages', id: 1 })
    await payload.count({ collection: 'pages' })

  Tip: top-level await works. Use .exit or Ctrl-D to quit.
`)

  const server = repl.start({
    prompt: 'arduwyn> ',
    useColors: true,
    useGlobal: true,
  })

  server.context.payload = payload
  server.context.p = payload

  server.on('exit', () => process.exit(0))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

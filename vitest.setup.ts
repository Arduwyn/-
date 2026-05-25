// Vitest global setup.
// Loads environment variables from .env so integration tests (which boot Payload)
// can read DATABASE_URI / PAYLOAD_SECRET. Unit tests don't need the database.
import 'dotenv/config'

// Integration tests boot Payload and MUST NOT touch the dev/prod database.
// Force the connection at the isolated test database (created by docker-compose's initdb).
// CI can override via DATABASE_URI_TEST.
process.env.DATABASE_URI =
  process.env.DATABASE_URI_TEST ?? 'postgres://arduwyn:arduwyn@localhost:5432/arduwyn_test'

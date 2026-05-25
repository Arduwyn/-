import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // Vitest runs unit + Payload integration tests. End-to-end specs live in
    // tests/e2e and are run by Playwright, not Vitest.
    include: ['tests/unit/**/*.spec.ts', 'tests/int/**/*.int.spec.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', '.next/**'],
  },
})

# syntax=docker/dockerfile:1.7
#
# Multi-stage Dockerfile for the Next.js + Payload app.
# Targets the Next standalone output so the final image is ~150 MB instead of
# dragging the full node_modules tree.
#
# Build:    docker build -t arduwyn .
# Smoke:    docker run --rm -p 3000:3001 --env-file .env.production arduwyn
# Deploy:   Kamal handles build + push + remote pull (see config/deploy.yml).

ARG NODE_VERSION=22

# ---------- Stage 1: dependencies (cached when lockfile unchanged) ----------
FROM node:${NODE_VERSION}-slim AS deps
WORKDIR /app

# OpenSSL needed by some native modules; build-essential for any
# native compiles (sharp, bcrypt) that didn't ship a prebuilt binary
# for this platform.
RUN apt-get update && apt-get install -y --no-install-recommends \
      openssl \
      build-essential \
      python3 \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Pin pnpm to the same version as local dev.
RUN corepack enable && corepack prepare pnpm@11.3.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- Stage 2: builder ----------
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.3.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Placeholder env so any build-time env-var checks don't crash.
# Real secrets are injected by Kamal at runtime, not baked into the image.
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URI=postgres://build:build@localhost:5432/build
ENV PAYLOAD_SECRET=build-time-placeholder
# These S3_* placeholders aren't real credentials — they just need to be
# truthy so the s3Storage plugin's `if (S3_BUCKET && ...)` gate in
# payload.config.ts passes at build time. That lets `generate:importmap`
# discover the plugin's client component (S3ClientUploadHandler) and add
# it to the import map. Without this, the admin renders a blank page at
# runtime because Payload tries to look up the component and finds nothing.
# Real values come from Kamal secrets at runtime.
ENV S3_BUCKET=build-placeholder
ENV S3_ACCESS_KEY_ID=build-placeholder
ENV S3_SECRET_ACCESS_KEY=build-placeholder
ENV S3_ENDPOINT=https://build-placeholder.invalid
ENV S3_REGION=us-east-1

RUN pnpm payload generate:importmap
RUN pnpm build

# ---------- Stage 3: runner (final, smallest possible) ----------
FROM node:${NODE_VERSION}-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Sharp and other native modules expect these at runtime.
RUN apt-get update && apt-get install -y --no-install-recommends \
      openssl \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Non-root user — never run the app as root.
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs --no-create-home nextjs

# Next standalone bundle — server.js + the minimal node_modules subset it
# actually requires (traced from `next build`).
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Payload-specific: migrations need to live alongside the runtime so we can run
# `pnpm payload migrate` from inside the container if a deploy needs it.
COPY --from=builder --chown=nextjs:nodejs /app/migrations ./migrations

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

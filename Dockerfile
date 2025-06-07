#Base Stage
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

#Dependencies Stage
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile && pnpm add -D @sentry/cli

#Builder stage
FROM deps AS builder
COPY . .
RUN pnpm build

#Runner (Production) Stage
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
#COPY --from=builder /app/server.js ./server.js

EXPOSE 3000

CMD ["pnpm", "start"]
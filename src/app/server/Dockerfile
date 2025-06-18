FROM node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY tsconfig.server.json ./
COPY src ./src

RUN pnpm exec tsc -p tsconfig.server.json

FROM node:20-slim

WORKDIR /app

COPY --from=0 /app/dist/app/server ./dist
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

EXPOSE 8080

CMD ["node", "dist/app/server/index.js"]
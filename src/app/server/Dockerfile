FROM node:18-alpine

WORKDIR /app

COPY ../../../package.json ../../../pnpm-lock.yaml ../../../tsconfig.server.json ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY ../../../. .

RUN pnpm exec tsc -p tsconfig.server.json

EXPOSE 8080

CMD ["pnpm", "start:server"]

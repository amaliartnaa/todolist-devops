FROM node:18-alpine

WORKDIR /app

COPY ../../package.json ../../pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

COPY ../../. .

RUN pnpm build:server

EXPOSE 3001

CMD ["pnpm", "start:server"]
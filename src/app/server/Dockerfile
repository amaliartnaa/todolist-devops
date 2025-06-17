FROM node:18-alpine

WORKDIR /app

COPY ../../package.json ../../pnpm-lock.yaml ../../tsconfig.json ../../tsconfig.server.json ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

COPY ../../. .

RUN pnpm exec tsc -p ./tsconfig.server.json

EXPOSE 3001

CMD ["pnpm", "start:server"]
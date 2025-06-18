FROM node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY tsconfig.server.json ./
COPY src ./src

RUN pnpm exec tsc -p tsconfig.server.json

EXPOSE 8080

CMD ["node", "dist/app/server/index.js"]

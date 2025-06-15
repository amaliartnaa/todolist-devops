FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY src/app/server ./ 

RUN npm install -g pnpm && pnpm install --frozen-lockfile

WORKDIR /app/server

EXPOSE 8080

CMD ["pnpm", "start"]

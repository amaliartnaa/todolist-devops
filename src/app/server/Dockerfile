FROM node:18-alpine

WORKDIR /app

COPY ../../dist ./dist
COPY ../../package.json ../../pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --prod

EXPOSE 8080

CMD ["node", "dist/index.js"]

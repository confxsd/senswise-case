FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma /app/prisma

RUN npm install

EXPOSE 3000


CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && npm start"]

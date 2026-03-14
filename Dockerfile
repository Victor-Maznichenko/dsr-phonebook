FROM oven/bun:1 AS builder

WORKDIR /app

COPY bun.lock bun.lock ./
COPY package.json turbo.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json

RUN bun install

COPY . .

# ---------- запуск ----------
FROM node:22.22 AS runtime

WORKDIR /app

# копируем приложение
COPY --from=builder /app /app

# копируем bun binary
COPY --from=builder /usr/local/bin/bun /usr/local/bin/bun

EXPOSE 5173 7000

CMD ["bun", "run", "dev"]
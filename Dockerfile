# 1. Базовый минимальный образ с Node.js
FROM node:20-alpine AS base

# 2. Установка рабочей директории
WORKDIR /app

# 3. Копируем только package.json и lock-файл для установки зависимостей
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ✅ 4. Копируем Prisma схему ДО генерации клиента
COPY prisma ./prisma
RUN yarn prisma generate

# ✅ 5. Копируем остальные исходники и компилируем
COPY . .
RUN yarn build

# 6. Продуктивный запуск
CMD ["node", "dist/index.js"]
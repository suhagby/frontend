FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production || true
COPY . .
RUN npx prisma generate --schema backend/prisma/schema.prisma || true
CMD ["node", "backend/src/index.js"]
EXPOSE 3000

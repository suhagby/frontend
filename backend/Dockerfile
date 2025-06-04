FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production || true
COPY . .
RUN npx prisma generate
EXPOSE 12000
CMD ["node", "src/index.js"]

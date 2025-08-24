FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --production || yarn --production || true
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node","src/server.js"]

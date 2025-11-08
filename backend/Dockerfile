# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm ci --omit=dev || npm i --omit=dev

# Copy source
COPY src ./src

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/index.js"]

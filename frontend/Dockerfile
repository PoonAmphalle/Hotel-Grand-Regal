# Development stage
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

# Production build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm i
COPY public ./public
COPY src ./src
# Allow overriding API base via build-arg
ARG REACT_APP_API_BASE
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
RUN npm run build

# Production serve stage
FROM nginx:alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
# Add SPA fallback so direct /route loads index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
RUN npm install --no-save express http-proxy-middleware
COPY --from=build /app/dist ./dist
COPY server.mjs ./server.mjs
EXPOSE 5173
CMD ["node", "server.mjs"]

# apps/client/Dockerfile

FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/client/package.json apps/client/package.json
RUN npm ci --workspaces

# Bring in source
COPY . .

# Provide API base for Vite build (service name resolves via Docker DNS)
ARG VITE_API_BASE=http://uzupis-cat-server-1:5174
ENV VITE_API_BASE=${VITE_API_BASE}
RUN npm run -w apps/client build

FROM nginx:alpine AS prod
COPY --from=build /app/apps/client/dist /usr/share/nginx/html
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

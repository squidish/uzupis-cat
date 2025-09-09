# apps/client/Dockerfile

# ---------- Build ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Copy only manifests for deterministic, cached installs (monorepo root lockfile)
    COPY package.json package-lock.json ./
    COPY apps/client/package.json apps/client/package.json
    
    # Install deps using the root lockfile and workspaces
    RUN npm ci --workspaces
    
    # Bring in the source
    COPY . .
    
    # Build only the client workspace
    RUN npm run -w apps/client build
    
    # ---------- Runtime (static) ----------
    FROM nginx:alpine AS prod
    # Copy the built static files into nginx's web root
    COPY --from=build /app/apps/client/dist /usr/share/nginx/html
    
    # Optional: custom nginx config (uncomment if you add one)
    # COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    

# apps/server/Dockerfile

# ---------- Builder ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # Root + workspace manifests for deterministic install
    COPY package.json package-lock.json ./
    COPY apps/server/package.json apps/server/package.json
    
    # Install using root lockfile & workspaces
    RUN npm ci --workspaces
    
    # Bring in source and build the server (must emit apps/server/dist)
    COPY . .
    RUN npm run -w apps/server build
    
    # ---------- Runtime ----------
    FROM node:20-alpine AS runtime
    WORKDIR /app
    ENV NODE_ENV=production
    ENV PORT=5174
    
    # Install ONLY server prod deps (root lockfile; deterministic)
    COPY package.json package-lock.json ./
    COPY apps/server/package.json apps/server/package.json
    RUN npm ci --omit=dev -w apps/server
    
    # Copy compiled JS only
    COPY --from=builder /app/apps/server/dist /app/apps/server/dist
    
    EXPOSE 5174
    CMD ["node", "apps/server/dist/index.js"]
    
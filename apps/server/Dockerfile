# apps/server/Dockerfile

# ========== Builder ==========
FROM node:20-alpine AS builder
WORKDIR /app

# Copy manifests (root + workspace) for a cached, deterministic install
COPY package.json package-lock.json ./
COPY apps/server/package.json apps/server/package.json

# Install deps across workspaces using the ROOT lockfile
RUN npm ci --workspaces

# Bring in source and build
COPY . .
# If you DO have a build step, keep this; if not, it's harmless to remove.
RUN npm run -w apps/server build || true

# ========== Runtime ==========
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5174

# Install ONLY server production deps using the root lockfile
COPY package.json package-lock.json ./
COPY apps/server/package.json apps/server/package.json
RUN npm ci --omit=dev -w apps/server

# Copy the ENTIRE server workspace (src + dist/build + assets), but not its node_modules
COPY --from=builder /app/apps/server /app/apps/server
RUN rm -rf /app/apps/server/node_modules

# If your server needs env/config/static assets from elsewhere, copy them here.

EXPOSE 5174
# This should point at whatever your package.json defines.
# e.g. "start": "node dist/index.js" or "start": "node build/index.js"
CMD ["npm", "run", "-w", "apps/server", "start"]

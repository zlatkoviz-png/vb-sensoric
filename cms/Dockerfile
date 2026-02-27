FROM node:20-alpine AS builder

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

# Create Strapi project in a clean temp directory
WORKDIR /tmp/strapi-build
RUN npx create-strapi-app@latest . \
    --no-run \
    --dbclient postgres \
    --dbhost db \
    --dbport 5432 \
    --dbname vb_sensoric \
    --dbusername vb_user \
    --dbpassword placeholder \
    --dbssl false \
    --typescript

# Production image
FROM node:20-alpine

RUN apk add --no-cache vips-dev

WORKDIR /opt/app

# Copy built Strapi project
COPY --from=builder /tmp/strapi-build/ ./

# Override database config to use env vars
RUN mkdir -p config
COPY config/database.ts ./config/database.ts

EXPOSE 1337

CMD ["npm", "run", "develop"]

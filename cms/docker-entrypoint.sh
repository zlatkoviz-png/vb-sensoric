#!/bin/sh
set -e

# If package.json doesn't have strapi, initialize new project
if ! grep -q '"@strapi/strapi"' package.json 2>/dev/null; then
  echo "Initializing new Strapi project..."
  npx create-strapi-app@latest . \
    --no-run \
    --dbclient postgres \
    --dbhost "$DATABASE_HOST" \
    --dbport "$DATABASE_PORT" \
    --dbname "$DATABASE_NAME" \
    --dbusername "$DATABASE_USERNAME" \
    --dbpassword "$DATABASE_PASSWORD" \
    --dbssl false \
    --typescript
  npm install
fi

# Run Strapi in development mode
npm run develop

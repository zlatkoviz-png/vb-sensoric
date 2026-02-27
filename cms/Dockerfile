FROM node:20-alpine

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /opt/app

# Copy package files if they exist, otherwise will be created by entrypoint
COPY package*.json ./

RUN if [ -f package.json ]; then npm install; fi

COPY . .

EXPOSE 1337

# Entrypoint: initialize Strapi if not already done
COPY docker-entrypoint.sh /opt/app/docker-entrypoint.sh
RUN chmod +x /opt/app/docker-entrypoint.sh

CMD ["/opt/app/docker-entrypoint.sh"]

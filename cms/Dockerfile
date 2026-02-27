FROM node:20-alpine

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /opt/app

# Copy package files and install dependencies
COPY package.json tsconfig.json ./
RUN npm install

# Copy config and source
COPY config ./config
COPY src ./src
COPY public ./public

EXPOSE 1337

CMD ["npm", "run", "develop"]

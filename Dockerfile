# Build Image
FROM node:18.12.1-alpine3.15 AS DEPENDENCIES
LABEL author="Bruno Barros bruno.barros@nka.pt"

RUN apk add --no-cache \
    libc6-compat \
    python3 \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Build Builder
FROM node:18.12.1-alpine3.15 AS BUILDER
LABEL author="Bruno Barros bruno.barros@nka.pt"
RUN apk add --no-cache \
    build-base \
    python3 \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev
WORKDIR /usr/src/app
COPY --from=DEPENDENCIES /usr/src/app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production
RUN yarn build

# Build production
FROM node:18.12.1-alpine3.15 AS PRODUCTION
LABEL author="Bruno Barros bruno.barros@nka.pt"
RUN apk add --no-cache \
    build-base \
    python3 \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev

WORKDIR /usr/src/app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

COPY --from=BUILDER /usr/src/app/.next/standalone ./standalone
COPY --from=BUILDER /usr/src/app/public /usr/src/app/standalone/public
COPY --from=BUILDER /usr/src/app/.next/static /usr/src/app/standalone/.next/static

EXPOSE 3001
ENV PORT 3001
CMD ["node", "./standalone/server.js"]

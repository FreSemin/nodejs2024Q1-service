ARG NODE_VERSION=20.11.0

################################################################################
# Base configuration
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app/api

EXPOSE ${APP_PORT:-4000}

################################################################################
# Production dependencies
FROM base as proddependencies

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

################################################################################
# Development dependencies
FROM base as devdependencies

COPY package*.json ./

RUN npm ci && npm cache clean --force

################################################################################
# Build Stage
FROM devdependencies as build

COPY . .

COPY --from=devdependencies /usr/src/app/api/node_modules ./node_modules

RUN npx prisma generate && npm run build

################################################################################
# Run for development
FROM base as dev

COPY . .

COPY --from=devdependencies /usr/src/app/api/node_modules ./node_modules

CMD npx prisma generate && npm run start:dev

################################################################################
# Run for production
FROM base as prod

USER node

COPY package.json .
COPY doc ./doc/

COPY --from=proddependencies /usr/src/app/api/node_modules ./node_modules

COPY --from=build /usr/src/app/api/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /usr/src/app/api/node_modules/.prisma ./node_modules/.prisma

COPY --from=build /usr/src/app/api/dist ./dist

CMD npm run start:prod

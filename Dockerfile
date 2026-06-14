# Adjust NODE_VERSION as desired
ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]

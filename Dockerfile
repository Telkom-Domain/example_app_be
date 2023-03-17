# First stage: build the TypeScript app
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# RUN npm run start

# Second stage: serve the TypeScript app with node
FROM node:latest AS base
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build  /app/build ./build
EXPOSE 3000
CMD ["node", "build/index.js"]
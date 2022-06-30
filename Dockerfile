FROM node:16.15.1-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16.15.1-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /usr/src/app/dist/ dist/
CMD ["npm", "start"]

FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run compile

RUN mkdir -p /var/share

CMD ["sh", "-c",  "npm run start"]
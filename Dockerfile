FROM node:18-bookworm-slim

ARG ENV_VAL=dev

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:$ENV_VAL

EXPOSE 3000

CMD npm run start
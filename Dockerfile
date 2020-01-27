FROM node:10

WORKDIR /app

COPY . /app

ENV APP_PORT=3000 \
  DB_URI=mongodb://db:27017/super-enigma-db \
  NODE_ENV=production

RUN yarn install

CMD node index.js

EXPOSE 3000

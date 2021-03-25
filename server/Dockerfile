FROM node:lts-alpine3.10

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "dev" ]
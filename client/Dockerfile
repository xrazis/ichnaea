FROM node:lts-alpine3.10

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install

EXPOSE 6000

CMD [ "npm", "run", "dev" ]
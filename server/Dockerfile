FROM node:14-alpine

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "dev" ]
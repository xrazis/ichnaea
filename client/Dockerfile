FROM node:latest

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install

EXPOSE 6000

CMD [ "npm", "run", "dev" ]
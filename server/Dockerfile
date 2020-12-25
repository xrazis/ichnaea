FROM node:latest

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "dev" ]
FROM node:14-alpine

WORKDIR /usr/src/app/web

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]
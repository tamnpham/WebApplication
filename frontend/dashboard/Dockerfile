FROM node:16-alpine

WORKDIR /code/

USER root

COPY package.json .
RUN npm install -f

ENTRYPOINT npm start

EXPOSE 3000

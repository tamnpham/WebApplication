FROM node:16-alpine

WORKDIR /code/

USER root

COPY package.json .
RUN npm install -f

EXPOSE 3000

FROM ubuntu:latest

RUN mkdir /dashboard
WORKDIR /dashboard/

USER root

RUN apt update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install -g yarn -y

COPY . .
RUN npm install -f

ENTRYPOINT npm start

EXPOSE 3000

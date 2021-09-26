FROM ubuntu:latest

ARG myvar=testval
ENV ENV_VAR "value"

WORKDIR /root

USER root

RUN apt update
RUN apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn -y

RUN npx create-react-app my-app

WORKDIR /root/my-app

ENTRYPOINT npm start

EXPOSE 3000

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

COPY . .
RUN ls
RUN npm install -f

ENTRYPOINT npm start

EXPOSE 3000

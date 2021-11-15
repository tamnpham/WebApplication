FROM ubuntu:latest

WORKDIR /code
USER root

RUN apt update 

RUN apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

COPY ./package.json .
RUN npm install -f

EXPOSE 3000

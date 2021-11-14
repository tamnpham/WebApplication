FROM ubuntu:latest

WORKDIR /root

USER root

RUN apt update
RUN apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn -y

COPY . .
RUN npm install -f
  
ENTRYPOINT powershell.exe npm start

EXPOSE 3000

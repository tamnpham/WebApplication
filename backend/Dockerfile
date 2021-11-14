FROM ubuntu:latest

WORKDIR /code
COPY requirements.txt /code/
RUN apt update && apt upgrade -y
RUN apt install software-properties-common -y
RUN apt install python3.8 -y
RUN apt install python3-pip -y
RUN python3 -m pip install --upgrade pip
RUN pip3 install psycopg2-binary
RUN pip3 install -r requirements.txt
COPY . /code/
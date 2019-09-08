FROM node:10

RUN apt update && apt install -y vim curl

WORKDIR /app

COPY . /app

CMD make ci
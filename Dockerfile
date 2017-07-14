FROM node:6.11
RUN npm config set registry https://registry.npm.taobao.org

RUN mkdir /app
WORKDIR /app

COPY . /app

EXPOSE 3000

RUN npm install

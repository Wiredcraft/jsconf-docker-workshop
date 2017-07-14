FROM node:6.11

WORKDIR /app

RUN npm config set registry https://registry.npm.taobao.org

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

#CMD npm run start
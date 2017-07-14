FROM node:6.11

WORKDIR /app

COPY package.json /app
RUN npm config set registry https://registry.npm.taobao.org && \
    npm install

COPY . /app

EXPOSE 3000

#CMD npm run start
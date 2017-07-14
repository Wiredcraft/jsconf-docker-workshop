FROM node:8.0.0

# Set npm registry
RUN npm config set registry https://registry.npm.taobao.org

# Create app directory and setup working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app
RUN npm install

# Copu source code
COPY . /usr/src/app

EXPOSE 3000

# Start the server
CMD [ "npm", "start" ]

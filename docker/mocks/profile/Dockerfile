FROM node:6

# Create app directory
RUN mkdir -p /opt/work/profile
WORKDIR /opt/work/profile

# Install dependencies
COPY ./src/package.json ./
RUN npm install
# Volume tricks http://stackoverflow.com/a/32785014/4550665
RUN mv ./node_modules ../node_modules

COPY ./src/ ./

EXPOSE 3007


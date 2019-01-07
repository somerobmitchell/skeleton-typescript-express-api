FROM node:lts-alpine
LABEL maintainer="Robert Mitchell <robert.mitchell@vualto.com>"

RUN mkdir /app
WORKDIR /app

COPY package.json tsconfig.json /app/
COPY src /app/src

RUN npm install -g nodemon \
    npm install --production && \
    npm run build:release && \
    rm -rf src

EXPOSE 9292

CMD nodemon dist/app.js

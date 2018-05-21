FROM mhart/alpine-node:8
LABEL maintainer="Robert Mitchell <robert.mitchell@vualto.com>"

RUN mkdir /app
WORKDIR /app

COPY package.json tsconfig.json /app/
COPY src /app/src

RUN npm install -g typescript@2.8.1 && \
    npm install && \
    tsc && \
    rm -rf src

EXPOSE 9292

CMD node dist/app.js
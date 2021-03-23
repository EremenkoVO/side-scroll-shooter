FROM node:lts-alpine as build

RUN apk add --no-cache git

RUN npm install --global http-server

WORKDIR src

RUN git clone https://github.com/EremenkoVO/side-scroll-shooter.git . \
    && yarn install \
    && yarn run build

EXPOSE 8080

CMD [ "http-server", "dist" ]

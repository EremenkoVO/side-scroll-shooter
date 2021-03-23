FROM node:lts-alpine as build

RUN npm install --global http-server

WORKDIR src

COPY . .

RUN yarn \
    && yarn run build

EXPOSE 8080

CMD [ "http-server", "dist" ]

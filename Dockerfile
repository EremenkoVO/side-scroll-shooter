FROM node:lts-alpine as build

WORKDIR src

COPY . .

RUN yarn \
    && yarn run build

FROM node:lts-alpine as final

COPY --from=build /src/dist /dist

RUN npm install --global http-server

EXPOSE 8080

ENTRYPOINT [ "http-server", "/dist" ]

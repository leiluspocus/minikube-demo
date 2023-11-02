FROM node:lts-buster-slim

ADD . /workdir

WORKDIR /workdir

EXPOSE 8888

RUN yarn install


CMD [ "yarn", "start" ]

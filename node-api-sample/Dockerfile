FROM node:lts-buster-slim

ADD . /workdir
ENV NODE_ENV=production
ENV TZ="Europe/Paris"

WORKDIR /workdir

EXPOSE 8888

RUN yarn install


CMD [ "yarn", "start" ]

FROM node:16.15-alpine

RUN apk add chromium
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN apk update

COPY package*.json ./

RUN yarn global add typescript

RUN yarn global add node-gyp

RUN yarn install

COPY --chown=node:node . .

RUN npm run build:prod

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]

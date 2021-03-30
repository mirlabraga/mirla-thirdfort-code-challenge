FROM node:12.10.0

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ADD . /usr/src/app

RUN npm run build

CMD [ "npm", "run", "start:server" ]

EXPOSE 3001

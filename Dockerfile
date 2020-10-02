FROM node:12.18.4

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

RUN npm install pm2 -g

RUN npm run data:load

EXPOSE 3000

COPY . .

CMD ["pm2-runtime", "server/index.js"]
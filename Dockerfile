FROM node:14-alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY app ..
RUN npm install

CMD npm start
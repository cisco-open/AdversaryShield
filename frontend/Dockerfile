FROM node:20.15.1

RUN apt-get clean \
    && apt-get -y update

RUN apt-get -y install nginx

RUN mkdir /app
ADD /frontend/ /app/

WORKDIR /app
RUN npm install
RUN npm run build:prod

WORKDIR /app/server
RUN npm install

EXPOSE 4200

CMD ["node", "/app/server/server.js"]

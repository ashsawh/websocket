FROM node

WORKDIR /var/app/backend

COPY package.json /var/app/backend

COPY server.log /var/log/server.log

RUN yarn install

COPY . /var/app/backend

EXPOSE 5000

CMD ["tail", "-f",  "/var/log/server.log"]
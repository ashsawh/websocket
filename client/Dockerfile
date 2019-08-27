FROM node

WORKDIR /var/app/client

COPY package.json /var/app/client

COPY . /var/app/client

RUN yarn install

EXPOSE 3000

CMD ["yarn", "run", "start"]
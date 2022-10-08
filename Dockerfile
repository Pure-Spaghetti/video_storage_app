FROM node:14

WORKDIR /opt

COPY . .

RUN cd client && npm i
RUN cd client && npm run build

WORKDIR api

RUN npm i

CMD [ "npm", "start" ]

EXPOSE 3030
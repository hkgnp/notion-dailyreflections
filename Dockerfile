FROM --platform=linux/amd64 node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD npm start

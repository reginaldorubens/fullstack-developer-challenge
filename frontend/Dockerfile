FROM node:14

RUN mkdir -p /usr/src/app/ui

WORKDIR /usr/src/app/ui

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]
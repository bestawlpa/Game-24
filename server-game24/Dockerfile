FROM node:20

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3088

CMD ["npm", "run", "dev"]
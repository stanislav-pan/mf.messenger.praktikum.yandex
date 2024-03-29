FROM node:13-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE $PORT
CMD [ "npm", "run", "start"]
FROM node:14
WORKDIR /usr/src/frontend
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 3003 4003
CMD [ "npm", "run", "ci" ]
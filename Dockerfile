FROM node:14
WORKDIR /usr/src/frontend
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 3000 4000
CMD [ "npm", "run", "ci" ]
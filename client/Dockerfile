FROM node:10.15.1
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app 
EXPOSE 3002
CMD [ "npm","start" ]
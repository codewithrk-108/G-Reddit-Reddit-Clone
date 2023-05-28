FROM node:19.3.0

COPY package.json .

RUN npm install --force
# copy the files 
COPY . .
# 
EXPOSE 4000


CMD [ "npm", "start" ]
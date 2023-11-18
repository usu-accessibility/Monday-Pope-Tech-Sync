FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONDAY_SIGNING_SECRET=4100e50d2d9c35c72e752b4941cb66fc \
    TUNNEL_SUBDOMAIN=integration-10099184 \ 
    PORT=8301

EXPOSE 8301

CMD ["npm", "run", "server"]




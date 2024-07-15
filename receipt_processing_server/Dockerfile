FROM node:18-alpine as base

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","run", "start"]
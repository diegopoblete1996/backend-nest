FROM node:22 AS etapa-uno

WORKDIR /usr/app


COPY ./dist ./dist
COPY ./package*.json ./
RUN npm install --only=production


EXPOSE 3000

CMD ["node", "dist/main.js"]
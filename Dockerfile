FROM node:20-alpine AS base

WORKDIR /app


COPY package.json package.json
RUN npm install --production


COPY app.js app.js
COPY controllers controllers
COPY init-scripts init-scripts
COPY init.js init.js
COPY lib lib
COPY routes routes
COPY schemas schemas

ENV PORT=3000

EXPOSE 3000

CMD ["node", "app.js"]
FROM node:16

WORKDIR /app

COPY . .

RUN npm i

ENV PORT=8000

EXPOSE ${PORT}

CMD npm run ${START_COMMAND:-start} 
FROM node:6.11

ENV WORKDIR=/var/app

WORKDIR $WORKDIR

RUN mkdir -p $WORKDIR

COPY . $WORKDIR

EXPOSE 3000

CMD ["npm", "start"]


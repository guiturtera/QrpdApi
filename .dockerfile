FROM node:latest
LABEL maintainer="Guilherme Turtera"
#ENV key=value
COPY . /var/www
WORKDIR /var/www
RUN npm install --also=dev
ENTRYPOINT npm start
EXPOSE 3000
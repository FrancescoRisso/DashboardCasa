FROM nginx:alpine

WORKDIR /app

COPY ./images /app/images
COPY ./static /app/static
COPY ./asset-manifest.json /app/asset-manifest.json
COPY ./customServiceWorker.js /app/customServiceWorker.js
COPY ./index.html /app/index.html
COPY ./manifest.json /app/manifest.json
COPY ./offline.html /app/offline.html

COPY ./nginx.conf /etc/nginx/nginx.conf

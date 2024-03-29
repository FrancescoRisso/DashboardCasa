FROM nginx:alpine

WORKDIR /app

ARG SSL_key=" "
ENV SSL_key=$SSL_key

ARG SSL_pem=" "
ENV SSL_pem=$SSL_pem

COPY ./images /app/images
COPY ./static /app/static
COPY ./asset-manifest.json /app/asset-manifest.json
COPY ./customServiceWorker.js /app/customServiceWorker.js
COPY ./index.html /app/index.html
COPY ./manifest.json /app/manifest.json
COPY ./offline.html /app/offline.html

COPY ./nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT mkdir -p /etc/ssl; echo "${SSL_key}" | sed 's/^ //' >> /etc/ssl/SSL_key.key; echo "${SSL_pem}" | sed 's/^ //' >> /etc/ssl/SSL_pem.pem; nginx -g "daemon off;"

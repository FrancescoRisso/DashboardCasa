FROM nginx:1.17.0

WORKDIR /app

ARG SSL_key=" "
ENV SSL_key=$SSL_key

ARG SSL_pem=" "
ENV SSL_pem=$SSL_pem

ARG GUNICORN_ADDR=" "
ENV GUNICORN_ADDR=$GUNICORN_ADDR

COPY ./nginx.conf /etc/nginx/nginx.conf
RUN sed -i "s@REPLACEME_WITH_GUNICORN_ADDR@$GUNICORN_ADDR@" /etc/nginx/nginx.conf

COPY ./customServiceWorker.js /app/customServiceWorker.js
COPY ./index.html /app/index.html
COPY ./manifest.json /app/manifest.json
COPY ./offline.html /app/offline.html
COPY ./asset-manifest.json /app/asset-manifest.json
COPY ./static /app/static
COPY ./images /app/images

EXPOSE 443

ENTRYPOINT cat /etc/nginx/nginx.conf; mkdir -p /etc/ssl; echo "${SSL_key}" | sed 's/^ //' >> /etc/ssl/SSL_key.key; echo "${SSL_pem}" | sed 's/^ //' >> /etc/ssl/SSL_pem.pem; nginx -g "daemon off;"

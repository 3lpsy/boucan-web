# Assets Container
FROM alpine:3.10 as build-stage
RUN mkdir -p /webui
RUN rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*
RUN apk update
RUN apk add --update nodejs npm
# RUN npm install -g typescript
RUN npm install -g @vue/cli
COPY ./package.json /webui/package.json
WORKDIR /webui
RUN npm install

COPY . /webui

ARG VUE_APP_API_BASE
ARG VUE_APP_API_URL
ARG VUE_APP_BROADCAST_BASE
ARG VUE_APP_BROADCAST_URL

# TODO: this should be prod, use build arg to include devtools but default to prod
RUN npm run build

# Main Container
FROM nginx:1.15

# do not listen on 80 & 443, a future http service will listen on that port
EXPOSE 8080
EXPOSE 8443

ENV SECURE_LISTEN_PORT="8443"
ENV INSECURE_LISTEN_PORT="8080"
ENV SSL_ENABLED="1"
ENV API_BACKEND_PROTO="https"
ENV API_BACKEND_HOST="api"
ENV API_BACKEND_PORT="8080"
ENV DEBUG_CONF="0"
ENV TLS_DIR="/etc/letsencrypt/live/boucan.proxy.docker"

# for development, make /var/www/nginx/webui a volume
RUN mkdir /nginxconfs
COPY nginx/insecure.nginx.conf /nginxconfs

# TODO: make prod actually prod
COPY nginx/ssl.nginx.conf /nginxconfs

RUN chown -R nginx:nginx /nginxconfs

RUN mkdir -p /var/www/app
COPY --from=build-stage /webui/dist/ /var/www/app/webui
COPY --from=build-stage /webui/landing/ /var/www/app/landing

RUN chown -R nginx:nginx /var/www

RUN mkdir -p /etc/letsencrypt/live/boucan.proxy.docker

# dynamically configure configs or user defaults to avoid mounts
COPY ./docker-run.sh /usr/bin/docker-run.sh
RUN chmod +x /usr/bin/docker-run.sh
ENTRYPOINT ["/usr/bin/docker-run.sh"]

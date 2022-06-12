FROM ubuntu:bionic
LABEL maintainer="Dunayeu <dunayeu@yahor.me>"

RUN useradd -u 2001 -U -m -d /opt/www yahor

RUN apt update && apt install -y curl gnupg git &&\
    curl -sL https://deb.nodesource.com/setup_11.x | bash - &&\
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - &&\
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list &&\
    apt update && apt install -y --no-install-recommends yarn nodejs

USER 2001
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /opt/www
COPY --chown=2001 ./ ./

RUN yarn && yarn build

ENTRYPOINT ["/opt/www/entry.sh"]

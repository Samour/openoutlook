#!/bin/bash

. CONFIG

ENV="$2"

deploy-fe() {
  rsync -rvz ../frontend/build/ $REMOTE_ADDR:/var/www/$ENV/fe
}

deploy-be() {
  ssh $REMOTE_ADDR "systemctl stop strapi-$ENV"
  rsync -rvz ../strapi/ $REMOTE_ADDR:/var/www/$ENV/strapi \
    --exclude=.* \
    --exclude=node_modules \
    --exclude=package-lock.json
  ssh $REMOTE_ADDR <<<"""
  cd /var/www/$ENV/strapi
  set NODE_ENV=$ENV
  NODE_ENV=production npm i
  systemctl start strapi-$ENV
  """
}

deploy-db() {
  ssh $REMOTE_ADDR <<<"""
  systemctl stop strapi-$ENV
  cp /var/www/$ENV/strapi/.tmp/data.db /var/www/$ENV/strapi/.tmp/data.db.\`date -Is\`
  """
  rsync -vz ../strapi/.tmp/data.db $REMOTE_ADDR:/var/www/$ENV/strapi/.tmp/
  rsync -vz ../strapi/public/uploads/* ../strapi/public/uploads/
  ssh $REMOTE_ADDR "systemctl start strapi-$ENV"
}

fetch-db() {
  rsync -vz $REMOTE_ADDR:/var/www/$ENV/strapi/.tmp/data.db ../strapi/.tmp/data.db
  rsync -vz $REMOTE_ADDR:/var/www/$ENV/strapi/public/uploads/* ../strapi/public/uploads/
}

if [ "$1" == "fe" ]; then
  deploy-fe
elif [ "$1" == "be" ]; then
  deploy-be
elif [ "$1" == "db" ]; then
  deploy-db
elif [ "$1" == "all" ]; then
  deploy-be
  deploy-db
  deploy-fe
elif [ "$1" == "fetch-db" ]; then
  fetch-db
else
  echo "System not specified. Specify fe or be"
fi
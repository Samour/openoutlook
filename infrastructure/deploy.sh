#!/bin/bash

. CONFIG

ENV="$2"

deploy-fe() {
  rsync -rz ../frontend/build/ $REMOTE_ADDR:/var/www/$ENV/fe
}

deploy-be() {
  ssh $REMOTE_ADDR "systemctl stop strapi-$ENV"
  rsync -rz ../strapi/ $REMOTE_ADDR:/var/www/$ENV/strapi \
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
  rsync -z ../strapi/.tmp/data.db $REMOTE_ADDR:/var/www/$ENV/strapi/.tmp/
  ssh $REMOTE_ADDR "systemctl start strapi-$ENV"
}

if [ "$1" == "fe" ]; then
  deploy-fe
elif [ "$1" == "be" ]; then
  deploy-be
elif [ "$1" == "db" ]; then
  deploy-db
else
  echo "System not specified. Specify fe or be"
fi
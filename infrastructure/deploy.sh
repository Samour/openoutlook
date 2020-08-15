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

promote() {
  ssh $REMOTE_ADDR <<<"""
  cp -r /var/www/$STAGING/fe /var/www/$PRODUCTION/fe_new
  cp -r /var/www/$PRODUCTION/fe/public/* /var/www/$PRODUCTION/fe_new/public/
  cp /var/www/$STAGING/fe/public/index.html /var/www/$PRODUCTION/fe_new/public/
  rm -r /var/www/$PRODUCTION/fe
  mv /var/www/$PRODUCTION/fe_new /var/www/$PRODUCTION/fe

  systemctl stop strapi-$PRODUCTION

  BAK_FNAME=/var/www/$PRODUCTION/strapi/.tmp/data.db.\`date -Is\`
  cp /var/www/$PRODUCTION/strapi/.tmp/data.db \$BAK_FNAME
  cp /var/www/$STAGING/strapi/.tmp/data.db /var/www/$PRODUCTION/strapi/.tmp/data.db
  cp -r /var/www/$STAGING/strapi/public/uploads/* /var/www/$PRODUCTION/strapi/public/uploads/

  sqlite3 /var/www/$PRODUCTION/strapi/.tmp/data.db \"DROP TABLE IF EXISTS $ENQUIRIES_TABLE\"
  sqlite3 \$BAK_FNAME \".dump $ENQUIRIES_TABLE\" | sqlite3 /var/www/$PRODUCTION/strapi/.tmp/data.db

  systemctl start strapi-$PRODUCTION
  """
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
elif [ "$1" == "promote" ]; then
  promote
else
  echo "System not specified. Specify fe or be"
fi
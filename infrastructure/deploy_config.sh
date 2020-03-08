#!/bin/bash

. CONFIG

deploy-nginx() {
  rsync -rz nginx/ $REMOTE_ADDR:/etc/nginx
  ssh $REMOTE_ADDR systemctl restart nginx
}

deploy-systemd() {
  rsync -rz systemd/ $REMOTE_ADDR:/etc/systemd
  ssh $REMOTE_ADDR systemctl daemon-reload
}

if [ "$1" == "nginx" ]; then
  deploy-nginx
elif [ "$1" == "systemd" ]; then
  deploy-systemd
elif [ "$1" == "all" ]; then
  deploy-nginx
  deploy-systemd
else
  echo "Unrecognized service. Specify nginx or all"
fi

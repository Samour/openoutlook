#!/bin/bash

. CONFIG

ssh $REMOTE_ADDR <<EOF

# Stop & uninstall Postfix
systemctl stop postfix
yum remove -y postfix

# Create swapfile
dd if=/dev/zero of=/swapfile count=2048 bs=1MiB
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile   swap    swap    sw  0   0" >> /etc/fstab

# Set up environment filesystem
mkdir /var/www
mkdir /var/www/staging
mkdir /var/www/staging/fe
mkdir /var/www/staging/strapi
mkdir /var/www/production
mkdir /var/www/production/fe
mkdir /var/www/production/strapi

# Install & configure Nginx
yum install -y epel-release
yum install -y nginx
systemctl enable nginx
systemctl start nginx

# Install & configure certbot
yum install -y certbot-nginx

# Install node/npm
curl https://nodejs.org/dist/v12.16.1/node-v12.16.1-linux-x64.tar.xz > node-v12.16.1-linux-x64.tar.xz
tar --strip-components 1 -xvf node-v12.16.1-linux-x64.tar.xz -C /usr/local
rm -f node-v12.16.1-linux-x64.tar.xz

EOF

# Deploy SystemD units

rsync -rz systemd/ $REMOTE_ADDR:/etc/systemd
ssh $REMOTE_ADDR systemctl enable strapi-staging

# Deploy nginx config
./deploy_config.sh nginx

# Install & configure certbot

ssh $REMOTE_ADDR <<<"""
yum -y install yum-utils
yum-config-manager --enable rhui-ap-southeast-2-rhel-server-extras rhui-ap-southeast-2-rhel-server-optional
yum install -y certbot-nginx
yum install -y certbot python2-certbot-nginx
certbot --nginx -n
echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
"""
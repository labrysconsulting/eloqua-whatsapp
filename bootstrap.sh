curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo apt-get -y install nodejs -y
sudo apt-get -y install build-essential
sh nodesource_setup.sh
apt-get -y install nodejs
sudo npm install -g pm2
cd /home/administrator/labryscomponent
npm install
pm2 start index.js
pm2 startup systemd
sudo su -c "env PATH=$PATH:/usr/bin pm2 startup systemd -u administrator --hp /home/administrator"
systemctl status pm2
pm2 list
#install nginx
sudo apt-get -y install nginx
yes|cp -rf ./nginx/sites-available/default /etc/nginx/sites-available/default
nginx -t
systemctl restart nginx
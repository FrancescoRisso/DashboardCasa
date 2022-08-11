# My home dashboard

A dashboard to show all the useful current data in my house.

This is the build branch, it contains the minimized version which is ready to be deployed for every-day use. In order to view the more-readable version, visit the [code branch](https://github.com/FrancescoRisso/DashboardCasa/tree/code).

# Deploy

## Clone repository

`git clone -b build https://github.com/FrancescoRisso/DashboardCasa.git`

## Setup nginx

`sudo apt install nginx`

It is the web server that will serve the static files (the React app)

All the configuration is in `/etc/nginx/`

You have all the available sites in `./sites-available/` and all the active sites in `./sites-enable`

If this is the first nginx config, you should delete "default" from this last folder: `sudo rm /etc/nginx/sites-enabled/default`

Create your nginx config file with `sudo nano /etc/nginx/sites-available/dashboardCasa.nginx`

Write the file using this template (step by step explanation later):

```
server {
	listen 80;
	root /home/[user]/DashboardCasa;
	index index.html;

	location /api {
		include proxy_params;
		proxy_pass [linkToApiServer];
	}

	location /static {
		expires 1y;
		add_header Cache-Control "public";
	}

	location / {
		try_files $uri $uri/ /index.html;
		add_header Cache-Control "no-cache";
	}
}
```

Link the file you created to the `./sites-enable` folder using

`cd /etc/nginx/sites-enabled/`

`sudo ln -s ../sites-available/dashboardCasa.nginx dashboardCasa.nginx`

Reload the service with `sudo systemctl reload nginx`

## Setup gunicorn

```
pip3 install flask
sudo apt install gunicorn
sudo mkdir /var/log/dashboardCasa
sudo touch /var/log/dashboardCasa/log.log /var/log/dashboardCasa/error.log
sudo chmod a+w /var/log/dashboardCasa/*
pip3 install -r DashboardCasa/requirements.txt
```

It is the web server that will serve the data (the server.py file)

Create its configuration file using:

```
sudo tee -a /etc/systemd/system/dashboardCasa.service > /dev/null <<EOT
[Unit]
Description=Dashboard casa server
After=network.target

[Service]
User=<yourUbuntuUsername>
WorkingDirectory=<fullPathToTheServerFolder>
ExecStart=gunicorn -b 127.0.0.1:<port> -w <n (see below)> --access-logfile "/var/log/dashboardCasa/log.log" --error-logfile "/var/log/dashboardCasa/error.log" server:app
Restart=always

[Install]
WantedBy=multi-user.target
EOT
```

Please replace the <> brackets with the correct value.

n is the number of workers (parallel processes): it is suggested to have a number of workers of 1 + 2\*number of cores.

Reload systemctl with `sudo systemctl daemon-reload`.

Activate your process with `sudo systemctl start [fileName]`.

If you have to modify the api.js, just remember to run `sudo systemctl reload [fileName]` to reload it.

#!/bin/bash

node: #install node
	rm ./node_0.12.0-1_armhf.deb -f
	wget http://node-arm.herokuapp.com/node_0.12.0-1_armhf.deb
	sudo dpkg -i node_0.12.0-1_armhf.deb
	rm ./node_0.12.0-1_armhf.deb

npm: #install node deps
	npm install
	sudo npm install -g babel forever
	mkdir /home/pi/nodejs/log -p

install: node npm;

build: #run babel compiler
	npm run prepublish

run: #start the app forever
	forever start \
	-l log/access.log \
	-e log/error.log \
	-o log/out.log \
	--append \
	-p /home/pi/nodejs \
	--uid "Slack" \
	dist/app.js

kill:
	forever stop Slack

list:
	forever list

stopall:
	forever stopall

dev: build run

#!/bin/bash

[ ! -f config.json ] && cp config_template.json config.json

npm install

node app.js
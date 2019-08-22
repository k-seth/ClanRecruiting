#!/bin/bash

[ ! -f ./app/config.json ] && cp ./config_template.json ./app/config.json

cd ./app
mkdir -p ./historical

npm install
npm run dev 3030
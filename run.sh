#!/bin/bash

[ ! -f config.json ] && cp config_template.json config.json

npm install

npm run dev 3030
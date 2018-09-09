#!/bin/sh

node scripts/update-version.js

npm install
npm run build
cd dist && zip -r ../extension.zip *

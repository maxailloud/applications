#!/bin/sh

PROJECT_NAME="$1"

nx run build --prod --base-href https://maxailloud.github.io/applications/$PROJECT_NAME/ --project $PROJECT_NAME
cp ./dist/$PROJECT_NAME/index.html ./dist/$PROJECT_NAME/404.html

#!/bin/sh

PROJECT_NAME="$1"

nx run build --prod --base-href https://maxailloud.github.io/applications/$PROJECT_NAME/ --project $PROJECT_NAME

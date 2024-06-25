#!/bin/sh

DRIZZLE_COMMAND="$1"
PROJECT_NAME="$2"

echo 'Drizzle command: ' $DRIZZLE_COMMAND
echo 'Project: ' $PROJECT_NAME

npx drizzle-kit $DRIZZLE_COMMAND --config=apps/$PROJECT_NAME/drizzle.config.ts

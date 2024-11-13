#!/bin/sh

PROJECT_NAME="$1"

echo 'Project: ' $PROJECT_NAME

npx supabase functions serve --env-file apps/$PROJECT_NAME/.env --workdir apps/$PROJECT_NAME

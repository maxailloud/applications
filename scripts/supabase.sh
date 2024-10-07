#!/bin/sh

SUPABASE_COMMAND="$1"
PROJECT_NAME="$2"

echo 'Supabase command: ' $SUPABASE_COMMAND
echo 'Project: ' $PROJECT_NAME

npx supabase $SUPABASE_COMMAND --workdir apps/$PROJECT_NAME

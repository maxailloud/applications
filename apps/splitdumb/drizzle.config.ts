import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const SPLITDUMB_PROJECT_PATH = 'apps/splitdumb';

config({ path: SPLITDUMB_PROJECT_PATH + '/.env' });

export default defineConfig({
    dialect: 'postgresql',
    schema: SPLITDUMB_PROJECT_PATH + '/db/schema.ts',
    out: SPLITDUMB_PROJECT_PATH + '/db/migrations',
    dbCredentials: {
        url: process.env.SPLITDUMB_SUPABASE_DATABASE_URL,
    },
});

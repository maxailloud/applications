import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const PROPERTEA_PROJECT_PATH = 'apps/propertea';

config({ path: PROPERTEA_PROJECT_PATH + '/.env' });

export default defineConfig({
    dialect: 'postgresql',
    schema: PROPERTEA_PROJECT_PATH + '/db/schema.ts',
    out: PROPERTEA_PROJECT_PATH + '/db/migrations',
    dbCredentials: {
        url: process.env.PROPERTEA_SUPABASE_DATABASE_URL!,
    },
});

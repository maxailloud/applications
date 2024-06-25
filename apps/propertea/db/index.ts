import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';

config({ path: '.env' });

const client = postgres(process.env.PROPERTEA_SUPABASE_DATABASE_URL!);
export const db = drizzle(client);

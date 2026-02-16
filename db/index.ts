import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This is the main object you will import to do CRUD
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
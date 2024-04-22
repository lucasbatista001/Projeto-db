import { Client } from "pg";
const client = new Client({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT) ?? 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

await client.connect();

export { client as db };

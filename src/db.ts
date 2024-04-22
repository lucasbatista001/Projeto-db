import { Client } from "pg";
const client = new Client({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT) ?? 5432,
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "123456",
  database: process.env.DB_NAME ?? "postgres",
});

await client.connect();

export { client as db };

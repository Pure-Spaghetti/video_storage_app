import Pool from "pg-pool";


export async function runSql(sql: string, params?: any[]) {
  if (!process.env.PGDATABASE) throw new Error("Missing ENV PGDATABASE");
  if (!process.env.PGUSER) throw new Error("Missing ENV PGUSER");
  if (!process.env.PGPASSWORD) throw new Error("Missing ENV PGPASSWORD");
  if (!process.env.PGHOST) throw new Error("Missing ENV PGHOST");
  if (!process.env.PGPORT || !parseInt(process.env.PGPORT)) throw new Error("Missing or Invalid ENV PGPORT");

  const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    maxUses: 1,
    connectionTimeoutMillis: 30000
  });

  const client = await pool.connect();
  console.log(`\nrunning sql:\n${sql}\nWith params:\n${params}`);
  const result = await client.query(sql, params);
  console.log('sql ran successfully\n');
  client.release();
  return result;
};
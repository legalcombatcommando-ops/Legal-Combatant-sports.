// Idempotent database setup, safe to run on every deploy and on a brand-new empty database.
// Usage: DATABASE_URL=postgresql://... node scripts/migrate.mjs
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[migrate] DATABASE_URL is required.");
  process.exit(1);
}

const useSsl = ["1", "true", "require"].includes(String(process.env.DATABASE_SSL || "").toLowerCase());
const pool = new pg.Pool({
  connectionString: url,
  ssl: useSsl ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false" } : undefined,
});

const statements = [
  `CREATE TABLE IF NOT EXISTS site_assets (
     key varchar(60) PRIMARY KEY,
     content_type varchar(60) NOT NULL,
     data bytea NOT NULL,
     updated_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS inquiries (
     id serial PRIMARY KEY,
     reference varchar(32) UNIQUE,
     name varchar(120) NOT NULL,
     email varchar(254) NOT NULL,
     role varchar(80) NOT NULL,
     topic varchar(100) NOT NULL,
     message text NOT NULL,
     status varchar(30) NOT NULL DEFAULT 'new',
     email_delivery varchar(24) NOT NULL DEFAULT 'pending',
     whatsapp_delivery varchar(24) NOT NULL DEFAULT 'pending',
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS fighter_applications (
     id serial PRIMARY KEY,
     reference varchar(32) NOT NULL UNIQUE,
     full_name varchar(120) NOT NULL,
     email varchar(254) NOT NULL,
     phone varchar(30) NOT NULL,
     city varchar(100) NOT NULL,
     country varchar(100) NOT NULL,
     discipline varchar(40) NOT NULL,
     career_stage varchar(60) NOT NULL,
     needs jsonb NOT NULL,
     priority text NOT NULL DEFAULT '',
     timeline varchar(40) NOT NULL,
     contact_preference varchar(24) NOT NULL,
     whatsapp_consent boolean NOT NULL DEFAULT false,
     status varchar(30) NOT NULL DEFAULT 'new',
     email_delivery varchar(24) NOT NULL DEFAULT 'pending',
     whatsapp_delivery varchar(24) NOT NULL DEFAULT 'pending',
     consent_at timestamptz NOT NULL DEFAULT now(),
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  // Columns added after the first release, for databases created by an earlier version.
  `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS reference varchar(32)`,
  `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS email_delivery varchar(24) NOT NULL DEFAULT 'pending'`,
  `ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS whatsapp_delivery varchar(24) NOT NULL DEFAULT 'pending'`,
  `CREATE UNIQUE INDEX IF NOT EXISTS inquiries_reference_unique ON inquiries (reference)`,
];

async function connectWithRetry(attempts = 20) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const client = await pool.connect();
      return client;
    } catch (error) {
      if (attempt === attempts) throw error;
      console.log(`[migrate] Database not ready (attempt ${attempt}/${attempts}), retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

try {
  const client = await connectWithRetry();
  try {
    await client.query("BEGIN");
    for (const statement of statements) await client.query(statement);
    await client.query("COMMIT");
    console.log("[migrate] Database is up to date.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
} catch (error) {
  console.error("[migrate] Failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await pool.end();
}

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(__dirname, '../..');

// In prod (Railway), DATA_DIR points to the mounted volume so SQLite + uploads
// survive across deploys. Locally, defaults to ./server/data so dev keeps working.
const dataDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(serverRoot, 'data');

const config = {
  client: 'sqlite3',
  connection: {
    filename: path.join(dataDir, 'feedyourhead.sqlite'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
  pool: {
    afterCreate: (conn, cb) => {
      conn.run('PRAGMA foreign_keys = ON', cb);
    },
  },
};

export default config;

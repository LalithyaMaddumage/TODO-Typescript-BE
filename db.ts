import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Use the default 'postgres' database for this query
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Check if the database exists and create it if not
pool.query(
  `SELECT 1 FROM pg_database WHERE datname = $1`,
  [process.env.DB_NAME],
  (err, res) => {
    if (err) {
      console.error('Error checking database existence:', err);
    } else {
      if (res.rows.length === 0) {
        // The database doesn't exist, create it
        pool.query(
          `CREATE DATABASE ${process.env.DB_NAME}`,
          (err, res) => {
            if (err) {
              console.error('Error creating database:', err);
            } else {
              console.log(`Database "${process.env.DB_NAME}" created`);
            }
          }
        );
      } else {
        console.log(`Database "${process.env.DB_NAME}" already exists`);
      }
    }
  }
);

// Create the 'todos' table
pool.query(
  `CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
  )`,
  (err, res) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table "todos" is ready');
    }
  }
);

export default pool;

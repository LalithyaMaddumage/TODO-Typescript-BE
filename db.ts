import pg from 'pg'; // Import the entire 'pg' package as default
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ // Use pg.Pool
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), // Ensure port is parsed as a number
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Check if the 'todos' table exists, and create it if not
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

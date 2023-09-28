import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './db.ts'; // Import the database configuration

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Import your routes here
// const todoRoutes = require('./routes/todoRoutes');

// Use your routes
// app.use('/todos', todoRoutes);

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const client = await database.connect();
    const result = await client.query('SELECT * FROM todos');
    client.release(); // Release the client back to the pool

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


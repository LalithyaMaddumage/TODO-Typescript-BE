import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './db.ts'; // Import the database configuration

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Import your routes here
import todoRoutes from './routes/todoRoutes.ts';

// Use your routes
app.use('/todos', todoRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


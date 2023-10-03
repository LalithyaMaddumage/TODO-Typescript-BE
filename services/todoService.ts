import { QueryResult } from 'pg';
import db from '../db.ts';

// Define a Todo interface to specify the shape of a todo item
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Create a new to-do
export const createTodo = async (title: string, completed: boolean): Promise<Todo> => {
  try {
    // Execute an SQL query to insert a new todo into the database
    const result: QueryResult = await db.query(
      'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, completed]
    );
    // Return the created todo
    return result.rows[0] as Todo;
  } catch (err) {
    // Handle errors and throw them for handling at a higher level
    throw err;
  }
};

// Get all to-dos
export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    // Execute an SQL query to fetch all todos from the database
    const result: QueryResult = await db.query('SELECT * FROM todos');
    // Return the list of todos
    return result.rows as Todo[];
  } catch (err) {
    // Handle errors and throw them for handling at a higher level
    throw err;
  }
};

// Get one to-do by ID
export const getTodoById = async (id: number): Promise<Todo | null> => {
  try {
    // Execute an SQL query to fetch a todo by ID from the database
    const result: QueryResult = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    // Return the fetched todo or null if not found
    return result.rows[0] as Todo || null;
  } catch (err) {
    // Handle errors and throw them for handling at a higher level
    throw err;
  }
};

// Update a to-do by ID
export const updateTodo = async (id: number, title: string, completed: boolean): Promise<Todo | null> => {
  try {
    // Execute an SQL query to update a todo by ID in the database
    const result: QueryResult = await db.query(
      'UPDATE todos SET title = $2, completed = $3 WHERE id = $1 RETURNING *',
      [id, title, completed]
    );
    // Return the updated todo or null if not found
    return result.rows[0] as Todo || null;
  } catch (err) {
    // Handle errors and throw them for handling at a higher level
    throw err;
  }
};

// Delete a to-do by ID
export const deleteTodo = async (id: number): Promise<Todo | null> => {
  try {
    // Execute an SQL query to delete a todo by ID from the database
    const result: QueryResult = await db.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    // Return the deleted todo or null if not found
    return result.rows[0] as Todo || null;
  } catch (err) {
    // Handle errors and throw them for handling at a higher level
    throw err;
  }
};

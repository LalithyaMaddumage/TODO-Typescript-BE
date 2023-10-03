import { Request, Response } from 'express';
import * as todoService from '../services/todoService.ts';

// Create a new to-do
export const createTodo = async (req: Request, res: Response): Promise<Response> => {
  // Extract data from the request body
  const { title, completed } = req.body;
  try {
    // Call the service function to create a new todo
    const newTodo = await todoService.createTodo(title, completed);
    // Send a success response with the created todo
    return res.status(201).json(newTodo);
  } catch (err) {
    // Handle errors and send an error response
    console.error('Error creating todo:', err);
    return res.status(500).json({ error: 'An error occurred while creating a new todo' });
  }
};

// Get all to-dos
export const getAllTodos = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Call the service function to get all todos
    const todos = await todoService.getAllTodos();
    // Send a response with the list of todos
    return res.json(todos);
  } catch (err) {
    // Handle errors and send an error response
    console.error('Error getting todos:', err);
    return res.status(500).json({ error: 'An error occurred while fetching todos' });
  }
};

// Get one to-do by ID
export const getTodoById = async (req: Request, res: Response): Promise<Response> => {
  // Extract the todo ID from the request parameters and convert it to a number
  const id = parseInt(req.params.id, 10);
  try {
    // Call the service function to get a todo by ID
    const todo = await todoService.getTodoById(id);
    // Check if the todo exists and send a response
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.json(todo);
  } catch (err) {
    // Handle errors and send an error response
    console.error('Error getting todo by ID:', err);
    return res.status(500).json({ error: 'An error occurred while fetching the todo' });
  }
};

// Update a to-do by ID
export const updateTodo = async (req: Request, res: Response): Promise<Response> => {
  // Extract the todo ID from the request parameters and convert it to a number
  const id = parseInt(req.params.id, 10);
  // Extract data from the request body
  const { title, completed } = req.body;
  try {
    // Call the service function to update a todo by ID
    const updatedTodo = await todoService.updateTodo(id, title, completed);
    // Check if the todo was found and updated
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    // Send a response with the updated todo
    return res.json(updatedTodo);
  } catch (err) {
    // Handle errors and send an error response
    console.error('Error updating todo:', err);
    return res.status(500).json({ error: 'An error occurred while updating the todo' });
  }
};

// Delete a to-do by ID
export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  // Extract the todo ID from the request parameters and convert it to a number
  const id = parseInt(req.params.id, 10);
  try {
    // Call the service function to delete a todo by ID
    const deletedTodo = await todoService.deleteTodo(id);
    // Check if the todo was found and deleted
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    // Send a response with the deleted todo
    return res.json(deletedTodo);
  } catch (err) {
    // Handle errors and send an error response
    console.error('Error deleting todo:', err);
    return res.status(500).json({ error: 'An error occurred while deleting the todo' });
  }
};

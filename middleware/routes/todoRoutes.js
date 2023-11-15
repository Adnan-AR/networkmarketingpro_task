// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const Todo = require('../src/models/Todo');
const HttpError = require('../utils/HttpError');
const { check, validationResult } = require('express-validator');


// GET all todos
router.get('/todos', async (req, res, next) => {
    try {
	const todos = await Todo.find();
	res.json(todos);
    } catch (error) {
	next(new HttpError(500, 'Internal Server Error'));
    }
});

// POST a new todo
router.post(
    '/todos',
    [
	// Validation middleware
	check('title').notEmpty().withMessage('Title is required'),
	check('description').notEmpty().withMessage(
	    'Description is required'),
    ],
    async (req, res, next) => {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	    return next(new HttpError(400, 'Validation Error', {
		details: errors.array() }));
	}

	// Proceed with saving the item
	const newTodo = new Todo(req.body);

	try {
	    const savedTodo = await newTodo.save();
	    res.status(201).json(savedTodo);
	} catch (error) {
	    if (error.name === 'ValidationError') {
		next(new HttpError(400, 'Validation Error', {
		    details: error.errors
		}));
	    } else {
		next(new HttpError(500, 'Internal Server Error'));
	    }
	}
    }
);

// Example route that returns a 403 Forbidden error
router.get('/restricted', (req, res, next) => {
  // Check some condition (e.g., authentication)
  const isUserAuthenticated = false;

  if (!isUserAuthenticated) {
    next(new HttpError(403, 'Forbidden'));
  } else {
    // Proceed with the normal flow
    res.json({ message: 'Access Granted' });
  }
});

module.exports = router;

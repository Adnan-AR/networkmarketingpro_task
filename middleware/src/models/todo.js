const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
	title: String,
	description: String,
    }
);

const Todo = mongoose.model('Todo', itemSchema);

module.exports = Todo;

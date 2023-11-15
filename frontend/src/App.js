// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState(
	{ title: '', description: '' }
    );

    useEffect(() => {
	console.log("Fetching any data...")
	fetch('http://localhost:5000/api/todos')
	    .then((res) => res.json())
	    .then((data) => setItems(data))
	    .catch((error) => console.error('Error:', error));
    }, []);

    const handleInputChange = (e) => {
	console.log("I am on handle Input Change")
	setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
	console.log("I am on handle Form Submit")
	e.preventDefault();	
	fetch('http://localhost:5000/api/todos', {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(newItem),
	})
	    .then((res) => res.json())
	    .then((data) => setItems([...items, data]))
	    .catch((error) => console.error('Error:', error));
	
	// Clear the form after submitting
	setNewItem({ title: '', description: '' });
    };

    return (
	<div className="App">
	    <h1>Items</h1>
	    <form onSubmit={handleFormSubmit}>
		<label>
		    Title:
		    <input type="text" name="title" value={newItem.title} onChange={handleInputChange} />
		</label>
		<label>
		    Description:
		    <input type="text" name="description" value={newItem.description} onChange={handleInputChange} />
		</label>
		<button type="submit">Add Item</button>
	    </form>
	    <ul>
		{items.map((item) => (
		    <li key={item._id}>
			{item.title} - {item.description}
		    </li>
		))}
	    </ul>
	</div>
    );
}

export default App;

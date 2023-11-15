const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');
const httpErrorHandler = require('./utils/httpErrorHandler');
const config = require('config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use('/api', todoRoutes);


// MongoDB connection
const dbUrl = config.get('database.url');

mongoose.connect(
    dbUrl,
    {
	useNewUrlParser: true,
	useUnifiedTopology: true
    }
);




app.listen(
    PORT, () => {
	console.log(`Server is running on port ${PORT}`);
    }
);

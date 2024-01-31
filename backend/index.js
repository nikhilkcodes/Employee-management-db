const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const router = require('./routes/authRoutes');
const cors = require('cors');

const port = process.env.PORT;
// database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((data) => console.log(`Database connected ${data.connection.host}`))
	.catch((err) => {
		console.log('Database not connected', err);
		process.exit(1);
	});
// cors middleware
var corsOptions = {
	credentials: true,
	origin: ['http://localhost:5173', 'https://localhost:5173'],
	optionsSuccessStatus: 200,
	method: "GET, POST, PUT, PATCH, DELETE"
}

app.use(cors(corsOptions))
// using express.json to get request of json data
app.use(express.json());
//configuring cookie parser
app.use(cookieParser());
//using routes
app.use('/auth', router)

app.listen(port, () => console.log(`server is running on ${port}`))

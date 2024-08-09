import express from 'express';
import mongoose from 'mongoose'
import morgan from 'morgan'
import { connectToDatabase } from './database.js';

const app = express()
const port = 3000 

app.use(morgan('dev'))

connectToDatabase().catch(error => {
	console.error(`Failed to connect to the database: ${error}`)
	process.exit(1)
})

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`)
	next()
})

app.get('/', async (req, res) => {
	res.json({
		"test": "Hello"
	})
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
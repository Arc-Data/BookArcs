import express from 'express';
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config() 	

const app = express()
const port = 3000 

// obtain credentials from dotenv
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

// uri string, already contains the name of the database in the link
const mongoDB = `mongodb+srv://${user}:${pass}@cluster0.u1nbs4l.mongodb.net/bookarcs?retryWrites=true&w=majority`;

// returns a client where we can perform connection 
const client = new MongoClient(mongoDB)

const main = async () => {
	try {
		await client.connect()
	} catch(error) {
		console.error(`Error connecting to the database: ${error}`)
	} finally {
		await client.close()
	}
}

main()

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`)
	next()
})

app.get('/', (req, res) => {
	res.json({
		"test": "Hello"
	})
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
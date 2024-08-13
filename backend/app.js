import express from 'express';
import morgan from 'morgan'
import { connectToDatabase } from './database.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import passport from 'passport';

// TODO: I might be going about this the wrong way but i might need to soon
// migrate to session based authentication if i want to implement things like 
// active online users. Maybe JWT was kind of a mistake but lets see

const app = express()
const port = 3000 

app.use(morgan('dev'))

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())


connectToDatabase().catch(error => {
	console.error(`Failed to connect to the database: ${error}`)
	process.exit(1)
})

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`)
	next()
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.get('/', async (req, res) => {
	res.json({
		"test": "Hello"
	})
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
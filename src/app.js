//express
import express from 'express'
import userRoutes from './routes/users.routes.js'

const app = express()

// Middlewares
app.use(express.json())


app.use(userRoutes)

export default app;
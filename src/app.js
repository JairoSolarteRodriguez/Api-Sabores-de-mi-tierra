//express
import express from 'express'
import userRoutes from './routes/users.routes.js'
import cors from 'cors'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())


app.use(userRoutes)

export default app;
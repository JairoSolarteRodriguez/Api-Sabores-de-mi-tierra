//express
import express from 'express'
import cors from 'cors'

import userRoutes from './routes/users.routes.js'
import ProfileRoutes from './routes/profiles.routes.js'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())


app.use(userRoutes)
app.use(ProfileRoutes)

export default app;
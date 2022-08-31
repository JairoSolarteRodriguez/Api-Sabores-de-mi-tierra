//express
import express from 'express'
import cors from 'cors'

import userRoutes from './routes/users.routes.js'
import ProfileRoutes from './routes/profiles.routes.js'
import ReportRoutes from './routes/reports.routes.js'
import CategoryRoutes from './routes/categories.routes.js'
import DificultRoutes from './routes/dificults.routes.js'
import InstrumentsRoutes from './routes/ingredients.routes.js'
import Tools from './routes/tools.routes.js'
import Prices from './routes/prices.routes.js'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())


app.use(userRoutes)
app.use(ProfileRoutes)
app.use(ReportRoutes)

// public api routes
app.use(CategoryRoutes)
app.use(DificultRoutes)
app.use(InstrumentsRoutes)
app.use(Tools)
app.use(Prices)

export default app;
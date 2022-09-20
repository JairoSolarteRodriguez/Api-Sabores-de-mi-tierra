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
import Measures from './routes/measures.routes.js'
import Steps from './routes/steps.routes.js'
import Recipes from './routes/recipes.routes.js'
import FavRecipes from './routes/favRecipes.routes.js'
import Stars from './routes/stars.routes.js'
import Home from './routes/home.routes.js'
import Feedbacks from './routes/feedback.routes.js'
import Comments from './routes/comments.routes.js'
import recipeReportsRoutes from './routes/recipeReports.routes.js'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

app.use(Recipes)
app.use(userRoutes)
app.use(ReportRoutes)
app.use(recipeReportsRoutes)
app.use(Steps)
app.use(FavRecipes)
app.use(Stars)
app.use(Home)
app.use(ProfileRoutes)
app.use(Comments)

// public api routes
app.use(CategoryRoutes)
app.use(DificultRoutes)
app.use(InstrumentsRoutes)
app.use(Tools)
app.use(Prices)
app.use(Measures)
app.use(Feedbacks)

export default app;
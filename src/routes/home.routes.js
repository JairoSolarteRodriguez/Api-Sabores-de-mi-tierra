import { Router } from 'express'

import { getBestRecipes, getFilterRecipes } from '../controllers/home/home.controller.js'

const router = Router()

router.get('/best-recipes', getBestRecipes)
router.get('/recipes-search', getFilterRecipes)

export default router
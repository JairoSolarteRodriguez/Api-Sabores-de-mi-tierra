import { Router } from 'express'

import { createStars, getRecipeStarsById, updateStars} from '../controllers/stars/stars.controller.js'

const router = Router()

/*==========Recipes Stars Routes=================*/
router.get('/recipes-stars/:recipe_id', getRecipeStarsById)
router.post('/recipes-stars', createStars)
router.patch('/recipes-stars/:recipe_id/:user_id', updateStars)

export default router
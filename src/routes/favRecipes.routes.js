import { Router } from 'express'

// Middlewares
import { authUser } from '../middlewares/authUser.js'

import { addFavRecipe, deleteFavRecipe, getFavRecipes } from '../controllers/favoriteRecipes/favoriteRecipe.controller.js'

const router = Router()

/*==========Fav Recipes Routes=================*/
router.get('/recipes-fav/:userId', getFavRecipes)
router.post('/recipes-fav', addFavRecipe)
router.delete('/recipes-fav/:userId/:recipeId', deleteFavRecipe)


export default router
